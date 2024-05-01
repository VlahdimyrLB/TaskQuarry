import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  Typography,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

const SingleProject = () => {
  const { projectID } = useParams(); // get the ID in url parameter
  const [singleProject, setSingleProject] = useState(null);
  const [features, setFeatures] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
    setNewFeature({
      name: "",
      description: "",
      status: "Not Yet Started",
      dueDate: null,
      assignedTo: null,
    });
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const [featureToUpdate, setFeatureToUpdate] = useState(null);

  const handleOpenUpdate = (id) => {
    const featureToUpdate = features.find((feature) => feature._id === id);
    setFeatureToUpdate(featureToUpdate);

    // Convert dueDate to the format "YYYY-MM-DD"
    const formattedDueDate = featureToUpdate.dueDate
      ? new Date(featureToUpdate.dueDate).toISOString().split("T")[0]
      : null;

    setUpdatedFeature({
      name: featureToUpdate.name,
      description: featureToUpdate.description,
      status: featureToUpdate.status,
      dueDate: formattedDueDate, // Set the formatted dueDate
      assignedTo: featureToUpdate.assignedTo,
    });

    setOpenUpdate(true);
  };

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`/api/v1/projects/${projectID}`);
      setSingleProject(data.project);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchFeatures = async () => {
    try {
      const { data } = await axios.get(`/api/v1/features/project/${projectID}`);
      setFeatures(data.features);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users`);
      setUsers(data.user);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchFeatures();
    fetchUsers();
  }, [projectID]);

  // CREATE/ADD HANDLER
  const [newFeature, setNewFeature] = useState({
    name: "",
    description: "",
    status: "Not Yet Started",
    dueDate: null,
    assignedTo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setNewFeature((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (value) => {
    setNewFeature((prevUser) => ({
      ...prevUser,
      assignedTo: value,
    }));

    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/v1/features/${projectID}`,
        newFeature
      );
      console.log("New Feature Created:", data.feature);

      setOpen(false);
      setFeatures((prevFeatures) => [...prevFeatures, data.feature]);
      fetchFeatures();
    } catch (error) {
      setError(error.message);
    }
  };

  // For Update Feature
  const [updatedFeature, setUpdatedFeature] = useState({
    name: "",
    description: "",
    status: "",
    dueDate: null,
    assignedTo: null,
  });

  const handleUpdateFeatureChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFeature((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSelect = (name, value) => {
    setUpdatedFeature((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `/api/v1/features/${featureToUpdate._id}`,
        updatedFeature // Use updatedFeature here
      );
      console.log("Feature Updated:", data.feature);
      setOpenUpdate(false);
      setFeatures((prevFeatures) =>
        prevFeatures.map((feature) =>
          feature._id === data.feature._id ? data.feature : feature
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col">
        <Card className="p-4">
          <Typography>Project: {singleProject.name}</Typography>
          <Typography>Description: {singleProject.description}</Typography>
          <Typography>
            Status: {singleProject.isDone ? "Done" : "Ongoing"}
          </Typography>
          <Typography>Priority: {singleProject.priority}</Typography>
        </Card>
      </div>

      <div className="flex shrink-0 flex-col gap-2 my-4  sm:flex-row ">
        <Button
          className="flex items-center gap-3"
          size="sm"
          onClick={handleOpen}
        >
          <PlusIcon strokeWidth={2} className="h-5 w-5" /> ADD A FEATURE
        </Button>
      </div>

      <div>
        <h1 className="text-xl font-bold">List of Features</h1>

        {features.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>Feature Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr
                  key={feature._id}
                  onClick={() => handleOpenUpdate(feature._id)}
                  className="hover:cursor-pointer hover:bg-blue-gray-50"
                >
                  <td>{feature.name}</td>
                  <td>{feature.description}</td>
                  <td>{feature.status}</td>
                  <td>
                    {feature.dueDate
                      ? new Date(feature.dueDate).toLocaleDateString()
                      : "No Due"}
                  </td>
                  <td>
                    {feature.assignedTo
                      ? users.find((user) => user._id === feature.assignedTo)
                          ?.name || "Not Assigned"
                      : "Not Assigned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No Features Yet</p>
        )}
      </div>

      {/* ADD FEATURE */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        size="sm"
        className="p-3"
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-md text-gray-800 uppercase">
            Add New Feature
          </DialogHeader>
          <DialogBody className="flex flex-col gap-7">
            <Input
              label="Enter Feature Name"
              variant="standard"
              size="md"
              name="name"
              value={newFeature.name || ""}
              onChange={handleChange}
              required
            />
            <Input
              label="Enter Feature Description"
              variant="standard"
              size="md"
              name="description"
              value={newFeature.description || ""}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              label="Enter Due Date"
              variant="standard"
              size="md"
              name="dueDate"
              value={newFeature.dueDate || ""}
              onChange={handleChange}
            />
            <Select
              label="Assign To"
              variant="standard"
              size="md"
              name="assignedTo"
              value={newFeature.assignedTo || ""}
              onChange={handleSelect}
              required
            >
              {users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              className="rounded-md hover:text-red-700 hover:border-red-700"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="filled"
              type="submit"
              className="rounded-md hover:opacity-75"
            >
              <span>Create</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* UPDATE FEATURE */}
      <Dialog
        open={openUpdate && featureToUpdate !== null}
        onClose={() => {
          setFeatureToUpdate(null);
          setOpenUpdate(false);
        }}
        size="sm"
        className="p-3"
      >
        <form onSubmit={handleUpdateSubmit}>
          <DialogHeader className="text-md text-gray-800 uppercase">
            Update Feature
          </DialogHeader>
          <DialogBody className="flex flex-col gap-7">
            <Input
              label="Feature Name"
              variant="standard"
              size="md"
              name="name"
              value={updatedFeature.name || ""}
              onChange={handleUpdateFeatureChange}
              required
            />
            <Input
              label="Feature Description"
              variant="standard"
              size="md"
              name="description"
              value={updatedFeature.description || ""}
              onChange={handleUpdateFeatureChange}
              required
            />
            <Select
              label="Status"
              variant="standard"
              size="md"
              name="status"
              value={updatedFeature.status || ""}
              onChange={(value) => handleUpdateSelect("status", value)}
              required
            >
              <Option value="Not Yet Started">Not Yet Started</Option>
              <Option value="Ongoing">Ongoing</Option>
              <Option value="Done">Done</Option>
            </Select>
            <Input
              type="date"
              label="Due Date"
              variant="standard"
              size="md"
              name="dueDate"
              value={updatedFeature.dueDate || ""}
              onChange={handleUpdateFeatureChange}
            />
            <Select
              label="Assign To"
              variant="standard"
              size="md"
              name="assignedTo"
              value={updatedFeature.assignedTo || ""}
              onChange={(value) => handleUpdateSelect("assignedTo", value)}
              required
            >
              {users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              variant="outlined"
              onClick={() => {
                setFeatureToUpdate(null);
                setOpenUpdate(false);
              }}
              className="rounded-md hover:text-red-700 hover:border-red-700"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="filled"
              type="submit"
              className="rounded-md hover:opacity-75"
            >
              <span>Update</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default SingleProject;
