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
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(!openUpdate);
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
      console.log(data.user);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchFeatures();
    fetchUsers();
  }, [projectID]);

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
                  onClick={handleOpenUpdate}
                  className="hover:cursor-pointer"
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
                    {feature.assignedTo ? feature.assignedTo : "Not Assigned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No Features Yet</p>
        )}
      </div>

      {/* UPDATE FEATURE */}
      <Dialog
        open={openUpdate}
        handler={handleOpenUpdate}
        size="sm"
        className="p-3"
      >
        <form>
          <DialogHeader className="text-md text-gray-800 uppercase">
            Update Feature
          </DialogHeader>
          <DialogBody className="flex flex-col gap-7">Test</DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              variant="outlined"
              onClick={handleOpenUpdate}
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
