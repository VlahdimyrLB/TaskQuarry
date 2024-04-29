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
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
    isDone: false,
  });

  const handleOpen = () => {
    setOpen(!open);
  };

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/projects");
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newProject);

    try {
      await axios.post("/api/v1/projects", newProject, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      fetchProjects();
      // Reset the form fields after successful submission
      setNewProject({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "Medium",
        isDone: false,
      });

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
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
      <div className="grid grid-cols-4 gap-4 mt-4">
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
                <p>
                  Priority:{" "}
                  <span
                    className={`text-${
                      project.priority === "Urgent"
                        ? "red-900"
                        : project.priority === "Important"
                        ? "deep-orange-500"
                        : project.priority === "Medium"
                        ? "blue-900"
                        : "green-900"
                    }`}
                  >
                    {project.priority}
                  </span>
                </p>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* CREATE NEW PROJECT */}
      <Dialog open={open} handler={handleOpen} size="sm" className="p-3">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-md text-gray-800 uppercase">
            Create New Project
          </DialogHeader>
          <DialogBody className="flex flex-col gap-7">
            <Input
              label="Project Name"
              variant="standard"
              size="md"
              name="name"
              onChange={handleChange}
              required
            />
            <Input
              label="Project Description"
              variant="standard"
              size="md"
              name="description"
              onChange={handleChange}
              required
            />
            <div className="flex space-x-2">
              <Input
                label="Start Date"
                type="date"
                variant="standard"
                size="md"
                name="startDate"
                onChange={handleChange}
                required
              />
              <Input
                label="End Date"
                type="date"
                variant="standard"
                size="md"
                name="endDate"
                onChange={handleChange}
                required
              />
            </div>
            // Inside the Select component
            <Select
              variant="standard"
              label="Select Priority Level"
              name="priority"
              value={priority} // Set directly to the state variable
              onChange={(value) => handlePriorityChange(value)} // Pass the selected value directly
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
