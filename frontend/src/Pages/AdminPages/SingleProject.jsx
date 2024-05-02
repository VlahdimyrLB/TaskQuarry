import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import CustomTableStyles from "../../Components/Shared/CustomTableStyles";
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
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const SingleProject = () => {
  const { projectID } = useParams(); // get the ID in url parameter
  const navigate = useNavigate();
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
      const { data } = await axios.post(`/api/v1/features/${projectID}`, {
        ...newFeature,
        parentProject: projectID, // Assign the parent project ID to the feature
      });
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
        {
          ...updatedFeature,
          parentProject: featureToUpdate.parentProject, // Maintain the parent project ID
        }
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

  const handleDeleteFeature = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this feature?"
    );
    if (confirmation) {
      try {
        await axios.delete(`/api/v1/features/${featureToUpdate._id}`);
        setFeatures((prevFeatures) =>
          prevFeatures.filter((feature) => feature._id !== featureToUpdate._id)
        );
        setFeatureToUpdate(null);
        setOpenUpdate(false);
        fetchFeatures();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const getAssignedToName = (assignedToId) => {
    const user = users.find((user) => user._id === assignedToId);
    return user ? user.name : "Not Assigned";
  };

  const columns = [
    {
      name: "Feature",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Due Date",
      selector: (row) => row.dueDate,
      sortable: true,
      format: (row) =>
        row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "No Due",
    },
    {
      name: "Assigned To",
      selector: (row) => row.assignedTo,
      format: (row) => getAssignedToName(row.assignedTo),
      sortable: true,
    },
  ];

  const handleDeleteProject = async () => {
    if (features.length > 0) {
      const confirmation = window.confirm(
        "This project has associated features. Deleting this project will also delete its features. Are you sure you want to proceed?"
      );
      if (confirmation) {
        try {
          await Promise.all(
            features.map((feature) =>
              axios.delete(`/api/v1/features/${feature._id}`)
            )
          );
          await axios.delete(`/api/v1/projects/${projectID}`);
          navigate("../projects");
        } catch (error) {
          setError(error.message);
        }
      }
    } else {
      const confirmation = window.confirm(
        "Are you sure you want to delete this project?"
      );
      if (confirmation) {
        try {
          await axios.delete(`/api/v1/projects/${projectID}`);
          navigate("../projects");
        } catch (error) {
          setError(error.message);
        }
      }
    }
  };

  // State and handlers for updating project
  const [project, setProject] = useState(null);
  const [openUpdateProject, setOpenUpdateProject] = useState(false);
  const [updatedProject, setUpdatedProject] = useState({
    name: "",
    description: "",
    priority: "",
    isDone: false,
  });

  const handleOpenUpdateProject = () => {
    setUpdatedProject({
      name: singleProject.name,
      description: singleProject.description,
      priority: singleProject.priority,
      isDone: singleProject.isDone,
    });
    setOpenUpdateProject(true);
  };

  const handleCloseUpdateProject = () => {
    setOpenUpdateProject(false);
  };

  const handleUpdateSelectProject = (name, value) => {
    setUpdatedProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProjectChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `/api/v1/projects/${projectID}`,
        updatedProject
      );
      setProject(data.project);
      setOpenUpdateProject(false);

      fetchProject();
    } catch (error) {
      console.error("Error updating project:", error.message);
    }
  };

  if (loading || users.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col">
        <Card className="p-4 rounded-md">
          <Typography>Project: {singleProject.name}</Typography>
          <Typography>Description: {singleProject.description}</Typography>
          <Typography>
            Status: {singleProject.isDone ? "Done" : "Ongoing"}
          </Typography>
          <Typography>Priority: {singleProject.priority}</Typography>
        </Card>

        <div>
          <Button onClick={handleDeleteProject}>Delete</Button>
          <Button onClick={handleOpenUpdateProject}>Update</Button>
        </div>
      </div>

      <Card className="rounded-md mt-4">
        <div className="p-2">
          <div className="flex shrink-0 flex-col gap-2 py-5 px-3 justify-between sm:flex-row ">
            <div>
              <p className="text-xl">Project Features</p>
            </div>
            <div>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={handleOpen}
              >
                <PlusIcon strokeWidth={2} className="h-5 w-5" /> ADD A FEATURE
              </Button>
            </div>
          </div>
          {features.length > 0 ? (
            <DataTable
              columns={columns}
              data={features}
              customStyles={CustomTableStyles}
              highlightOnHover
              pointerOnHover
              pagination
              fixedHeader
              onRowClicked={(row) => handleOpenUpdate(row._id)}
            />
          ) : (
            <p className="text-center">No Features Yet</p>
          )}
        </div>
      </Card>

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
          <DialogHeader className="text-md text-gray-800 uppercase flex justify-between">
            <p>Update Feature</p>
            <button onClick={handleDeleteFeature}>
              <TrashIcon
                strokeWidth={2}
                className="h-6 w-6 text-red-600 hover:text-red-900 hover:cursor-pointer"
              />
            </button>
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

      {/* UPDATE PROJECT DIALOG */}
      <Dialog
        open={openUpdateProject}
        handler={handleCloseUpdateProject}
        size="sm"
        className="p-3"
      >
        <form onSubmit={handleUpdateProjectSubmit}>
          <DialogHeader className="text-md text-gray-800 uppercase">
            Update Project
          </DialogHeader>
          <DialogBody className="flex flex-col gap-7">
            <Input
              label="Project Name"
              variant="standard"
              size="md"
              name="name"
              value={updatedProject.name}
              onChange={handleUpdateProjectChange}
              required
            />
            <Input
              label="Description"
              variant="standard"
              size="md"
              name="description"
              value={updatedProject.description}
              onChange={handleUpdateProjectChange}
              required
            />
            <Select
              label="Priority"
              variant="standard"
              size="md"
              name="priority"
              value={updatedProject.priority}
              onChange={(value) => handleUpdateSelectProject("priority", value)} // Directly pass name and value
              required
            >
              <Option value="Urgent">Urgent</Option>
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
            <Select
              label="Status"
              variant="standard"
              size="md"
              name="isDone"
              value={updatedProject.isDone ? "Done" : "Ongoing"}
              onChange={(value) =>
                setUpdatedProject((prev) => ({
                  ...prev,
                  isDone: value === "Done",
                }))
              }
              required
            >
              <Option value="Ongoing">Ongoing</Option>
              <Option value="Done">Done</Option>
            </Select>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              variant="outlined"
              onClick={handleCloseUpdateProject}
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
