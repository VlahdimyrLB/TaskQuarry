import React, { useState, useEffect } from "react";
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
  Checkbox,
} from "@material-tailwind/react";

import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const Assigned = ({ loggedUser }) => {
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [taskUpdates, setTaskUpdates] = useState({});

  useEffect(() => {
    fetchFeatures();
  }, [loggedUser._id]);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(
        `/api/v1/features/assigned/${loggedUser._id}`
      );
      setFeatures(response.data.features);
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  const formatDate = (dueDate) => {
    if (!dueDate) return "No Due";
    const date = new Date(dueDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleOpen = (feature) => {
    setSelectedFeature(feature);
    setStatus(feature.status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeature(null);
    setNewTaskName("");
    setTaskUpdates({}); // Reset task updates
  };

  const handleSelect = (value) => {
    setStatus(value);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.patch(
        `/api/v1/features/update-status/${selectedFeature._id}`,
        {
          status,
        }
      );
      fetchFeatures();
      handleClose();
    } catch (error) {
      console.error("Error updating feature status:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      await axios.post(`/api/v1/features/${selectedFeature._id}/tasks`, {
        name: newTaskName,
      });
      // Fetch the updated feature data after adding the task
      const updatedFeatureResponse = await axios.get(
        `/api/v1/features/${selectedFeature._id}`
      );
      const updatedFeature = updatedFeatureResponse.data.feature;

      // Update the selected feature state with the new tasks
      setSelectedFeature(updatedFeature);
      fetchFeatures();
      setNewTaskName("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(
        `/api/v1/features/${selectedFeature._id}/tasks/${taskId}`
      );
      // Fetch the updated feature data after deleting the task
      const updatedFeatureResponse = await axios.get(
        `/api/v1/features/${selectedFeature._id}`
      );
      const updatedFeature = updatedFeatureResponse.data.feature;
      // Update the selected feature state
      setSelectedFeature(updatedFeature);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskInputChange = (taskId, value) => {
    // Update taskUpdates state
    setTaskUpdates((prevTaskUpdates) => ({
      ...prevTaskUpdates,
      [taskId]: value,
    }));
  };

  const handleUpdateTask = async (taskId) => {
    try {
      const updatedName = taskUpdates[taskId];
      if (!updatedName) return; // If no change, do nothing

      await axios.patch(
        `/api/v1/features/${selectedFeature._id}/tasks/${taskId}`,
        {
          name: updatedName,
        }
      );
      // Fetch the updated feature data after updating the task
      const updatedFeatureResponse = await axios.get(
        `/api/v1/features/${selectedFeature._id}`
      );
      const updatedFeature = updatedFeatureResponse.data.feature;
      // Update the selected feature state with the new tasks
      setSelectedFeature(updatedFeature);
      fetchFeatures();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleTaskDoneChange = async (taskId, isChecked) => {
    try {
      await axios.patch(
        `/api/v1/features/${selectedFeature._id}/tasks/${taskId}`,
        {
          isDone: isChecked,
        }
      );
      // Fetch the updated feature data after updating the task
      const updatedFeatureResponse = await axios.get(
        `/api/v1/features/${selectedFeature._id}`
      );
      const updatedFeature = updatedFeatureResponse.data.feature;
      // Update the selected feature state
      setSelectedFeature(updatedFeature);
      fetchFeatures();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h2>My Assigned Features</h2>
      <table className="w-full table-fixed">
        {/* Table Headers */}
        <thead className="bg-blue-gray-50">
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Tasks to Accomplish</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr
              key={feature._id}
              onClick={() => handleOpen(feature)}
              className="hover:cursor-pointer hover:bg-blue-gray-50"
            >
              <td>
                <p>Name: {feature.name}</p>
                <p>Desription: {feature.description}</p>
              </td>
              <td>{feature.status}</td>
              <td>{formatDate(feature.dueDate)}</td>
              <td>
                {feature.tasks.length > 0 ? (
                  <ul>
                    {feature.tasks.map((task) => (
                      <li key={task._id} className="flex items-center">
                        {task.name}
                        <span>
                          {task.isDone === true ? (
                            <CheckCircleIcon
                              strokeWidth={2}
                              className="h-4 w-4"
                            />
                          ) : (
                            ""
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No Task Added"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Task Modal */}
      <Dialog open={open} handler={handleClose} size="sm" className="p-3">
        <DialogHeader className="text-md text-gray-800 uppercase">
          Feature Info
        </DialogHeader>
        <DialogBody className="flex flex-col">
          <p>Name: {selectedFeature?.name}</p>
          <p>Description: {selectedFeature?.description}</p>
          <p>Due Date: {formatDate(selectedFeature?.dueDate)}</p>
          <Select label="Status" value={status || ""} onChange={handleSelect}>
            <Option value="Not Yet Started">Not Yet Started</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Done">Done</Option>
          </Select>

          <div className="mt-2">
            <p>Tasks to Accomplish</p>
            <div className="relative flex w-full">
              <Input
                type="text"
                label="Add Task"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                variant="outlined"
                onClick={handleAddTask}
                size="sm"
                className="!absolute right-1 top-1 rounded hover:bg-black hover:text-white"
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>

            {/* List of tasks */}
            <div className="overflow-y-auto scroll-m-1 h-36">
              {selectedFeature?.tasks.length > 0 ? (
                <ul>
                  {selectedFeature.tasks.map((task) => (
                    <li key={task._id} className="flex items-center w-full">
                      <div>
                        <Checkbox
                          className="mx-4 my-4 h-4 w-4 rounded-full hover:shadow-none"
                          type="checkbox"
                          checked={task.isDone}
                          onChange={(e) =>
                            handleTaskDoneChange(task._id, e.target.checked)
                          }
                        />
                      </div>
                      <input
                        type="text"
                        value={taskUpdates[task._id] || task.name}
                        onChange={(e) =>
                          handleTaskInputChange(task._id, e.target.value)
                        }
                        onBlur={() => handleUpdateTask(task._id)}
                      />
                      <button onClick={() => handleDeleteTask(task._id)}>
                        <TrashIcon
                          strokeWidth={2}
                          className="h-5 w-5 text-red-600 hover:text-red-900"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                "No tasks added"
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            onClick={handleClose}
            variant="outlined"
            className="rounded-md hover:text-red-700 hover:border-red-700"
          >
            Close
          </Button>
          <Button onClick={handleUpdateStatus} className="hover:opacity-80">
            Update Status
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Assigned;
