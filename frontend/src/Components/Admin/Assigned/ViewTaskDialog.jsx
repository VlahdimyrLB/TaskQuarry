import React from "react";
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
import { CalendarDaysIcon, TrashIcon } from "@heroicons/react/24/solid";
export function ViewTaskDialog({ open, setOpen, handleOpen, selectedFeature }) {
  const formatDate = (dueDate) => {
    if (!dueDate) return "No Due";
    const date = new Date(dueDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
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
                value={selectedFeature?.status}
                // onChange={handleSelect}
              >
                <Option value="Not Yet Started">Not Yet Started</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Done">Done</Option>
              </Select>
            </div>
          </div>

          <div className="flex-1 flex-col">
            <p>Tasks to Accomplish</p>
            <div className="overflow-y-auto w-full scroll-m-1 max-h-[200px]">
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
                          // checked={task.isDone}
                          // onChange={(e) =>
                          //   handleTaskDoneChange(task._id, e.target.checked)
                          // }
                        />
                        <Input
                          type="text"
                          variant="standard"
                          size="md"
                          value={task.name}
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
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
