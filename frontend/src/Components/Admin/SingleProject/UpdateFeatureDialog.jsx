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
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

const UpdateFeatureDialog = ({
  featureToUpdate,
  openUpdateFeature,
  updatedFeature,
  setUpdatedFeature,
  fetchFeatures,
  users,
  closeUpdateFeature,
  setFeatureToUpdate,
  setError,
}) => {
  const handleUpdateFeatureChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFeature((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setUpdatedFeature((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleAssignChange = (value) => {
    setUpdatedFeature((prev) => ({
      ...prev,
      assignedTo: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`/api/v1/features/${featureToUpdate._id}`, {
        ...updatedFeature,
        parentProject: featureToUpdate.parentProject, // Maintain the parent project ID
      });

      fetchFeatures();
      closeUpdateFeature();
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
        const response = await axios.delete(
          `/api/v1/features/${featureToUpdate._id}`
        );

        setFeatureToUpdate(null);
        fetchFeatures();
        closeUpdateFeature();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <Dialog
      open={openUpdateFeature}
      handler={closeUpdateFeature}
      size="sm"
      className="p-3"
    >
      <form onSubmit={handleUpdateSubmit}>
        <DialogHeader className="text-md text-gray-800 uppercase flex justify-between">
          <p>Update Feature</p>
          <button type="button" onClick={handleDeleteFeature}>
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
            value={updatedFeature.status}
            onChange={handleStatusChange}
            required
          >
            <Option value="Not Yet Started">Not Yet Started</Option>
            <Option value="In Progress">In Progress</Option>
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
            value={updatedFeature.assignedTo}
            onChange={handleAssignChange}
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
            onClick={closeUpdateFeature}
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

export default UpdateFeatureDialog;
