// NewProjectDialog.js
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";

const NewProjectDialog = ({ isOpen, onClose, onProjectCreated }) => {
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
    isDone: false,
  });
  const [duplicate, setDuplicate] = useState(false);

  const handleChange = (e) => {
    setNewProjectData({ ...newProjectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name } = newProjectData;

    if (!name.trim()) {
      // Validation: Project name is required
      return;
    }

    // Check for duplicate project name
    const duplicateName = projects.find((project) => project.name === name);
    if (duplicateName) {
      setDuplicate(true);
      return;
    }

    try {
      await axios.post("/api/v1/projects", newProjectData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      onProjectCreated(); // Notify parent component that a new project was created

      // Reset form data
      setNewProjectData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "Medium",
        isDone: false,
      });

      onClose(); // Close the dialog
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} size="sm" className="p-3">
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
            value={newProjectData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Project Description"
            variant="standard"
            size="md"
            name="description"
            value={newProjectData.description}
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
              value={newProjectData.startDate}
              onChange={handleChange}
              required
            />
            <Input
              label="End Date"
              type="date"
              variant="standard"
              size="md"
              name="endDate"
              value={newProjectData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <Select
            variant="standard"
            label="Select Priority Level"
            name="priority"
            value={newProjectData.priority}
            onChange={(value) =>
              setNewProjectData({ ...newProjectData, priority: value })
            }
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

          {duplicate && (
            <p className="text-red-700">Project Name Already Exists</p>
          )}
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" onClick={onClose}>
            <span>Cancel</span>
          </Button>
          <Button variant="filled" type="submit">
            <span>Create</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default NewProjectDialog;
