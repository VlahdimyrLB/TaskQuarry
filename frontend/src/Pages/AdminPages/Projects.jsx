import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [priority, setPriority] = useState("Medium");
  // Open Add Feature Modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  // Open Add Feature Modal
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {};

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/projects", {
        headers: {
          Accept: "application/json",
        },
      });
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <>
      <div className="flex">
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            className="flex items-center gap-3"
            size="sm"
            onClick={handleOpen}
          >
            <PlusIcon strokeWidth={2} className="h-5 w-5" /> Create New PROJECT
          </Button>
        </div>
        <div className="flex-1 text-end ">
          <p>Search Bar Diteys</p>
        </div>
      </div>
      <div className="flex space-x-2 mt-5">
        {projects.map((project) => {
          return (
            <Link key={project._id} to={`/admin/projects/${project._id}`}>
              <Card className="p-4">
                <Typography>
                  Project Name:{" "}
                  <span className="font-bold">{project.name}</span>
                </Typography>
                <p>Description: {project.description}</p>
                <p>Status: {project.isDone === false ? "Ongoing" : "Done"}</p>
                <p>Priority: {project.priority}</p>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* CREATE NEW PROJECT */}
      <Dialog open={open} handler={handleOpen} size="sm" className="p-3">
        <form>
          <DialogHeader className="text-md text-gray-800 uppercase">
            Create New Project
          </DialogHeader>
          <DialogBody className="flex flex-col gap-7">
            <Input label="Project Name" variant="standard" size="md" required />
            <Input
              label="Project Description"
              variant="standard"
              size="md"
              required
            />
            <div className="flex space-x-2">
              <Input
                label="Start Date"
                type="date"
                variant="standard"
                size="md"
                required
              />
              <Input
                label="End Date"
                type="date"
                variant="standard"
                size="md"
                required
              />
            </div>
            <Select
              variant="standard"
              label="Select Priority Level"
              name="priority"
              value={priority}
              onChange={handlePriorityChange}
              className={`text-${
                priority === "Urgent"
                  ? "red-900"
                  : priority === "Important"
                  ? "deep-orange-500"
                  : priority === "Medium"
                  ? "blue-900"
                  : "light-green-800"
              }`}
            >
              <Option value="Urgent" className="text-red-900">
                Urgent
              </Option>
              <Option value="Important" className="text-deep-orange-500">
                Important
              </Option>
              <Option value="Medium" className="text-blue-900">
                Medium
              </Option>
              <Option value="Low" className="text-light-green-800">
                Low
              </Option>
            </Select>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              variant="outlined"
              onClick={handleOpen}
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
    </>
  );
};
export default Projects;
