import axios from "axios";

import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";

const UpdateProjectDialog = ({
  openProjectToUpdate,
  handleOpenUpdateProject,
  projectToUpdate,
  setProjectToUpdate,
  fetchProject,
  projectID,
}) => {
  // onChange Handlers
  const handleUpdateProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectToUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // here I directly used the event value provided by the
  // Select component from material tailwind
  // Material Talwind Select somehow can access the value without getting the e.target.value
  const handlePriorityChange = (value) => {
    setProjectToUpdate((prev) => ({
      ...prev,
      priority: value,
    }));
  };

  const handleStatusChange = (value) => {
    setProjectToUpdate((prev) => ({
      ...prev,
      isDone: value === "Done",
    }));
  };

  // UPDATE Function/Handler
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      // const { data } =
      await axios.patch(`/api/v1/projects/${projectID}`, projectToUpdate);

      fetchProject();
      handleOpenUpdateProject();
    } catch (error) {
      console.error("Error updating project:", error.message);
    }
  };

  return (
    <Dialog
      open={openProjectToUpdate}
      handler={handleOpenUpdateProject}
      size="sm"
      className="p-3"
    >
      <form onSubmit={handleUpdateProject}>
        <DialogHeader className="text-md text-gray-800 uppercase">
          Update Project
        </DialogHeader>
        <DialogBody className="flex flex-col gap-7">
          <Input
            label="Project Name"
            variant="standard"
            size="md"
            name="name"
            value={projectToUpdate.name}
            onChange={handleUpdateProjectChange}
            required
          />
          <Input
            label="Description"
            variant="standard"
            size="md"
            name="description"
            value={projectToUpdate.description}
            onChange={handleUpdateProjectChange}
            required
          />

          <div className="flex flex-col space-y-5 items-start ml-0 md:flex-row md:space-x-2">
            <Input
              label="Start Date"
              type="date"
              variant="standard"
              size="md"
              name="startDate"
              value={projectToUpdate.startDate}
              onChange={handleUpdateProjectChange}
              required
            />
            <Input
              label="End Date"
              type="date"
              variant="standard"
              size="md"
              name="endDate"
              value={projectToUpdate.endDate}
              onChange={handleUpdateProjectChange}
              required
            />
          </div>
          <Select
            label="Priority"
            variant="standard"
            size="md"
            name="priority"
            value={projectToUpdate.priority}
            onChange={handlePriorityChange}
            className={`text-${
              projectToUpdate.priority === "Urgent"
                ? "red-900"
                : projectToUpdate.priority === "Important"
                ? "deep-orange-500"
                : projectToUpdate.priority === "Medium"
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
          <Select
            label="Status"
            variant="standard"
            size="md"
            name="isDone"
            className={` ${
              projectToUpdate.isDone ? "text-green-900" : "text-yellow-900"
            }`}
            value={projectToUpdate.isDone ? "Done" : "Ongoing"}
            onChange={handleStatusChange}
          >
            <Option value="Ongoing" className="text-yellow-900">
              Ongoing
            </Option>
            <Option value="Done" className="text-green-900">
              Done
            </Option>
          </Select>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            onClick={handleOpenUpdateProject}
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
  );
};
export default UpdateProjectDialog;
