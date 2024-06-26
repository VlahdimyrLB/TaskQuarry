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

const NewProjectDialog = ({
  isOpen,
  projects,
  handleDialogToggle,
  handleProjectCreated,
}) => {
  const [duplicate, setDuplicate] = useState(false);

  const [newProjectData, setNewProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
    isDone: false,
  });

  const handleChange = (e) => {
    setNewProjectData({ ...newProjectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name } = newProjectData;
    if (!name.trim()) {
      return;
    }

    // Check for duplicate project name
    const duplicateName = projects.find((project) => project.name === name);
    if (duplicateName) {
      setDuplicate(true);
      return;
    }

    const options = { timeZone: "Asia/Manila", timeZoneName: "short" };
    const date1 = new Date(newProjectData.startDate).toLocaleDateString(
      "en-PH",
      options
    );
    const date2 = new Date(newProjectData.endDate).toLocaleDateString(
      "en-PH",
      options
    );
    const today = new Date().toLocaleDateString("en-PH", options).slice(0, 10);

    if (date1 === date2) {
      window.alert("Same Date not Applicable!");
      return;
    } else if (date1 > date2) {
      window.alert("End Date should be greater than Start Date!");
      return;
    } else if (date1 < today || date2 < today) {
      window.alert("Date should NOT be less than today!");
      return;
    }

    try {
      await axios.post("/api/v1/projects", newProjectData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(date1, date2, today);

      // Notify parent component that a new project was created and REFRESH states
      setDuplicate(false);
      setNewProjectData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "Medium",
        isDone: false,
      });
      handleProjectCreated();
      handleDialogToggle();
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleDialogToggle}
      size="sm"
      className="p-3"
    >
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
            className={`text-${
              newProjectData.priority === "Urgent"
                ? "red-900"
                : newProjectData.priority === "Important"
                ? "deep-orange-500"
                : newProjectData.priority === "Medium"
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

          {duplicate && (
            <p className="text-red-700 text-center">
              Project Name Already Exists
            </p>
          )}
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" onClick={handleDialogToggle}>
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
