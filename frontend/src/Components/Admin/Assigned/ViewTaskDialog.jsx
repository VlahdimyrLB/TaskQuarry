import axios from "axios";
import {
  Dialog,
  DialogFooter,
  Select,
  Option,
  Button,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

const ViewTaskDialog = ({
  open,
  status,
  handleClose,
  selectedFeature,
  formatDate,
  newTaskName,
  taskUpdates,
  setStatus,
  fetchFeatures,
  setNewTaskName,
  setSelectedFeature,
}) => {
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
      fetchFeatures();
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
    <Dialog open={open} handler={handleClose} size="sm" className="p-5">
      <div className="flex flex-col justify-start items-start">
        <p className="text-sm uppercase">Feature Name</p>
        <p className="text-lg font-semibold">{selectedFeature?.name}</p>
      </div>
      <div className="mt-4 space-y-6">
        <div>
          <p className="text-xs">Description</p>
          <Input
            variant="standard"
            value={selectedFeature?.description}
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs">Due Date</p>
            <Input
              variant="standard"
              value={formatDate(selectedFeature?.dueDate)}
              readOnly
            />
          </div>
          <div>
            <p className="text-xs">Status</p>
            <Select
              variant="standard"
              value={status || ""}
              onChange={handleSelect}
            >
              <Option value="Not Yet Started">Not Yet Started</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Done">Done</Option>
            </Select>
          </div>
        </div>
        <div className="">
          <p className="text-xs mb-2">Tasks to Accomplish</p>

          {/* List of tasks */}
          <div className="overflow-y-auto w-full scroll-m-1 max-h-[200px]">
            <div>
              {selectedFeature?.tasks.length > 0 ? (
                <div className="space-y-3">
                  {selectedFeature.tasks.map((task) => (
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
                          handleTaskDoneChange(task._id, e.target.checked)
                        }
                      />
                      <Input
                        type="text"
                        variant="standard"
                        size="md"
                        value={taskUpdates[task._id] || task.name}
                        onChange={(e) =>
                          handleTaskInputChange(task._id, e.target.value)
                        }
                        onBlur={() => handleUpdateTask(task._id)}
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

        <div className="relative flex w-full mt-4">
          <Input
            type="text"
            label="Add Task"
            variant="standard"
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
      </div>
      <DialogFooter className="space-x-2">
        <Button
          onClick={handleClose}
          variant="outlined"
          color="gray"
          className="rounded-md hover:text-red-700 hover:border-red-700"
        >
          Close
        </Button>
        <Button onClick={handleUpdateStatus} className="hover:opacity-80">
          Update Status
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
export default ViewTaskDialog;
