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

  useEffect(() => {
    fetchProject();
    fetchFeatures();
  }, [projectID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button
          className="flex items-center gap-3"
          size="sm"
          onClick={handleOpen}
        >
          <PlusIcon strokeWidth={2} className="h-5 w-5" /> ADD A FEATURE
        </Button>
      </div>
      <div>
        <p>Project: {singleProject.name}</p>
        <p>Description: {singleProject.description}</p>
        <p>Status: {singleProject.isDone ? "Done" : "Ongoing"}</p>
        <p>Priority: {singleProject.priority}</p>
      </div>

      <div>
        <h2>Features</h2>

        {features.length > 0 ? (
          <table className="table-auto">
            <thead>
              <tr>
                <th>Features</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assignee</th>
                <th>Related Task</th>
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
                  <td>{feature.isDone ? "Done" : "Ongoing"}</td>
                  <td>
                    {feature.assignedTo ? feature.assignedTo : "Not Assigned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Features Yet</p>
        )}
      </div>

      {/* CREATE NEW PROJECT */}
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
              <span>Create</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default SingleProject;
