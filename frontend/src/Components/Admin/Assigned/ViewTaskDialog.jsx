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
} from "@material-tailwind/react";
import {
  CalendarDaysIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

export function ViewTaskDialog({
  open,
  setOpen,
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

  // FEATURE-TASK REFRESHER
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
      console.error("Error updating task:", error);
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
          <div>
            {selectedFeature?.parentProject?.name}/
            <span className="text-gray-800"> {selectedFeature?.name}</span>
          </div>

          <p className="text-sm text-gray-700">
            {selectedFeature?.description}
          </p>
        </DialogHeader>
        <DialogBody className="flex justify-evenly items-start">
          <div className="flex-1 flex-col space-y-8 pt-4">
            <div className="w-48 ">
              <Input
                variant="static"
                type="datetime"
                label="Due Date (readonly)"
                value={formatDate(selectedFeature?.dueDate)}
                readOnly
                icon={<CalendarDaysIcon className="" />}
              />
            </div>

            <div className="w-40">
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

          <div className="flex-1 flex-col">
            <div className="relative flex w-full mb-4">
              <Input
                type="text"
                label="Add New Task"
                variant="standard"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <button
                onClick={handleAddTask}
                size="sm"
                className="!absolute right-1 top-4 rounded hover:text-black   "
              >
                <PlusIcon strokeWidth={2} className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto w-full scroll-m-1 max-h-[300px]">
              <div>
                {selectedFeature?.tasks?.length > 0 ? (
                  <div className="space-y-3">
                    {selectedFeature?.tasks.map((task) => (
                      <div
                        key={task._id}
                        className="flex w-full justify-start items-center rounded-none px-2 text-blue-gray-700 outline-none transition-all bg-blue-gray-50"
                      >
                        <Checkbox
                          className="my-3 h-4 w-4 rounded-full hover:shadow-none"
                          type="checkbox"
                          size="sm"
                          checked={task.isDone}
                          onChange={(e) =>
                            handleTaskDone(task._id, e.target.checked)
                          }
                        />
                        <Input
                          type="text"
                          variant="standard"
                          size="md"
                          // value={task.name}
                          // onChange={(e) =>
                          //   handleTaskInputChange(task._id, e.target.value)
                          // }
                          // onBlur={() => handleUpdateTask(task._id)}
                        />
                        <button onClick={() => handleDeleteTask(task._id)}>
                          <TrashIcon
                            strokeWidth={1}
                            className="h-5 w-5 text-gray-600 hover:text-red-600"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-12 font-semibold">
                    <p>No tasks added</p>
                  </div>
                )}
              </div>
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
