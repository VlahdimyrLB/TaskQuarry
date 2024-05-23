import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import DataTable from "react-data-table-component";

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
}) => {
  return (
    <Dialog
      open={openProjectToUpdate}
      handler={handleOpenUpdateProject}
      size="sm"
      className="p-3"
    >
      {/* <form onSubmit={handleUpdateProjectSubmit}> */}
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
          // onChange={handleUpdateProjectChange}
          required
        />
        <Input
          label="Description"
          variant="standard"
          size="md"
          name="description"
          value={projectToUpdate.description}
          // onChange={handleUpdateProjectChange}
          required
        />

        <div className="flex space-x-2">
          <Input
            label="Start Date"
            type="date"
            variant="standard"
            size="md"
            name="startDate"
            value={projectToUpdate.startDate}
            // onChange={handleUpdateProjectChange}
            required
          />
          <Input
            label="End Date"
            type="date"
            variant="standard"
            size="md"
            name="endDate"
            value={projectToUpdate.endDate}
            // onChange={handleUpdateProjectChange}
            required
          />
        </div>
        <Select
          label="Priority"
          variant="standard"
          size="md"
          name="priority"
          value={projectToUpdate.priority}
          // onChange={(value) => handleUpdateSelectProject("priority", value)}
          // className={`text-${
          //   updatedProject.priority === "Urgent"
          //     ? "red-900"
          //     : updatedProject.priority === "Important"
          //     ? "deep-orange-500"
          //     : updatedProject.priority === "Medium"
          //     ? "blue-900"
          //     : "light-green-800"
          // }`}
          required
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
          value="Done"
          // className={` ${
          //   updatedProject.isDone ? "text-green-900" : "text-yellow-900"
          // }`}
          // value={updatedProject.isDone ? "Done" : "Ongoing"}
          // onChange={(value) =>
          //   setUpdatedProject((prev) => ({
          //     ...prev,
          //     isDone: value === "Done",
          //   }))
          // }
          required
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
      {/* </form> */}
    </Dialog>
  );
};
export default UpdateProjectDialog;
