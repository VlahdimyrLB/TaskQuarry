import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import {
  CalendarDaysIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

export function ViewTaskDialog({
  open,
  handleOpen,
  selectedFeature,
  setSelectedFeature,
  featureStatus,
  setFeatureStatus,
  fetchFeatures,
}) {
  const formatDate = (dueDate) => {
    if (!dueDate) return "No Due";
    const date = new Date(dueDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Status Change Handler
  const handleStatusChange = async (value) => {
    try {
      setFeatureStatus(value);
      await axios.patch(
        `/api/v1/features/update-status/${selectedFeature._id}`,
        { status: value }
      );
      fetchFeatures();
    } catch (error) {
      console.error("Error updating status in database:", error);
    }
  };

  // FEATURE-TASK refresher
  const refresher = async () => {
    try {
      // Fetch updated feature to reload items
      const response = await axios.get(
        `/api/v1/features/${selectedFeature._id}`
      );
      const updatedFeature = response.data.feature;

      // Merge existing selectedFeature with updatedFeature to retain parentProject
      setSelectedFeature((prevFeature) => ({
        ...prevFeature,
        ...updatedFeature,
        parentProject:
          prevFeature.parentProject || updatedFeature.parentProject,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // Addd Task Handler
  const [taskName, setTaskName] = useState("");

  const handleAddTask = async () => {
    try {
      await axios.post(`/api/v1/features/${selectedFeature._id}/tasks`, {
        name: taskName,
      });

      refresher();
      fetchFeatures();
      setTaskName("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Check Task Handler
  const handleTaskDone = async (taskId, isChecked) => {
    try {
      await axios.patch(
        `/api/v1/features/${selectedFeature._id}/tasks/${taskId}`,
        {
          isDone: isChecked,
        }
      );
      refresher();
      fetchFeatures();
    } catch (error) {
      console.error("Error changing task status:", error);
    }
  };

  // Update Task Handler
  const [updatedTask, setUpdatedTask] = useState({});

  const handleTaskChange = (taskId, newValue) => {
    console.log(taskId, "task");
    setUpdatedTask((prevTaskValue) => ({
      ...prevTaskValue,
      [taskId]: newValue,
    }));
  };

  const handleTaskUpdate = async (taskId) => {
    try {
      const updatedInput = updatedTask[taskId];
      console.log(updatedInput, "Updated");
      // if (updatedInput === undefined || "") return;

      await axios.patch(
        `/api/v1/features/${selectedFeature._id}/tasks/${taskId}`,
        {
          name: updatedInput,
        }
      );

      refresher();
      fetchFeatures();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete Task Handler
  const handleDeleteTask = async (taskId) => {
    console.log(taskId);
    try {
      await axios.delete(
        `/api/v1/features/${selectedFeature._id}/tasks/${taskId}`
      );

      refresher();
      fetchFeatures();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="md"
      >
        <DialogHeader className="flex-col items-start">
          <div className="flex">
            <p className="">{selectedFeature?.parentProject?.name}</p>/
            <span className="text-gray-700 text-md">
              {selectedFeature?.name}
            </span>
          </div>

          <p className="text-sm text-gray-700">
            {selectedFeature?.description}
          </p>
        </DialogHeader>
        <DialogBody className="flex flex-col space-y-6 justify-center md:flex-row md:items-start md:justify-evenly md:space-y-0 md:space-x-6">
          <div className="space-y-8 pt-4">
            <div className="md:w-56">
              <Input
                variant="static"
                type="datetime"
                label="Due Date (readonly)"
                value={formatDate(selectedFeature?.dueDate)}
                readOnly
                icon={<CalendarDaysIcon className="" />}
              />
            </div>

            <div className="md:w-56">
              <Select
                label="Set Status"
                variant="static"
                value={featureStatus}
                onChange={handleStatusChange}
              >
                <Option value="Not Yet Started">Not Yet Started</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Done">Done</Option>
              </Select>
            </div>
          </div>

          <div className="flex-1 flex-col ">
            <div className="relative flex mb-4 md:pl-3">
              <Input
                type="text"
                label="Add New Task"
                variant="standard"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <button
                onClick={handleAddTask}
                size="sm"
                className="!absolute right-1 top-4 rounded hover:text-black   "
              >
                <PlusIcon strokeWidth={3} className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto w-full z max-h-[250px]">
              <Card className="shadow-none">
                {selectedFeature?.tasks?.length > 0 ? (
                  selectedFeature?.tasks.map((task) => (
                    <List className="pl-0" key={task._id}>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-react"
                          className="flex w-full cursor-pointer items-center justify-around py-2"
                        >
                          <ListItemPrefix className="mx-3">
                            <Checkbox
                              id="vertical-list-react"
                              ripple={false}
                              className="hover:before:opacity-0"
                              containerProps={{
                                className: "p-0",
                              }}
                              checked={task.isDone}
                              onChange={(e) =>
                                handleTaskDone(task._id, e.target.checked)
                              }
                            />
                          </ListItemPrefix>
                          <Typography
                            color="blue-gray"
                            className="font-medium mr-3"
                          >
                            <input
                              type="text"
                              className="appearance-none outline-none bg-transparent max-w-40"
                              value={updatedTask[task._id] || task.name}
                              onChange={(e) =>
                                handleTaskChange(task._id, e.target.value)
                              }
                              onBlur={() => handleTaskUpdate(task._id)}
                            />
                          </Typography>
                          <ListItemPrefix>
                            <button onClick={() => handleDeleteTask(task._id)}>
                              <TrashIcon
                                strokeWidth={1}
                                className="h-5 w-5 text-gray-600 hover:text-red-600"
                              />
                            </button>
                          </ListItemPrefix>
                        </label>
                      </ListItem>
                    </List>
                  ))
                ) : (
                  <div className="mt-5 text-center text-gray-700">
                    <p className="mr-5">No tasks added</p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="black"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
