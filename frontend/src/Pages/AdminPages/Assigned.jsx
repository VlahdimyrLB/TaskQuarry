import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Button,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,

} from "@heroicons/react/24/solid";
import { useTable, useSortBy, usePagination } from "react-table";
import CustomTableStyles from "../../Components/Shared/CustomTableStyles";

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

  // const fetchFeatures = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/api/v1/features/assigned/${loggedUser._id}`
  //     );
  //     const featuresWithParentProject = await Promise.all(
  //       response.data.features.map(async (feature) => {
  //         const featureWithParentProject = { ...feature };
  //         const parentProject = await axios.get(
  //           `/api/v1/projects/${feature.parentProject}`
  //         );
  //         featureWithParentProject.parentProjectName =
  //           parentProject.data.project.name;
  //         featureWithParentProject.parentProjectDescription =
  //           parentProject.data.project.description;
  //         featureWithParentProject.parentProjectPriority =
  //           parentProject.data.project.priority;
  //         featureWithParentProject.parentProjectStatus = parentProject.data
  //           .project.isDone
  //           ? "Done"
  //           : "Ongoing";
  //         return featureWithParentProject;
  //       })
  //     );
  //     setFeatures(featuresWithParentProject);
  //   } catch (error) {
  //     console.error("Error fetching features:", error);
  //   }
  // };

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(
        `/api/v1/features/assigned/${loggedUser._id}`
      );
      const featuresWithParentProject = await Promise.all(
        response.data.features.map(async (feature) => {
          const featureWithParentProject = { ...feature };
          const parentProject = await axios.get(
            `/api/v1/projects/${feature.parentProject}`
          );
          featureWithParentProject.parentProject = {
            name: parentProject.data.project.name,
            description: parentProject.data.project.description,
            priority: parentProject.data.project.priority,
          };
          featureWithParentProject.parentProjectPriority =
            parentProject.data.project.priority;
          featureWithParentProject.parentProjectStatus = parentProject.data
            .project.isDone
            ? "Done"
            : "Ongoing";
          return featureWithParentProject;
        })
      );
      setFeatures(featuresWithParentProject);
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
    setTaskUpdates({});
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

  const columns = React.useMemo(
    () => [
      {
        Header: "Parent Project",
        accessor: "parentProject", // Accessor for the parent project object
        Cell: ({ value }) => (
          <div className="flex flex-col">
            <span className="text-lg font-bold">{value.name}</span>
            <span className="text-sm">
              Priority: <span className="b">{value.priority}</span>{" "}
            </span>
          </div>
        ),
      },
      {
        Header: "Feature Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: "Task To Accomplish",
        accessor: "tasks",
        Cell: ({ value }) => {
          if (value.length === 0) {
            return <span>No Task Yet</span>;
          }
          return (
            <ul className="space-y-2">
              {value.map((task) => (
                <li
                  key={task._id}
                  className="flex items-center bg-gray-50 p-1.5 border"
                >
                  <span>
                    {task.isDone === true ? (
                      <CheckCircleIcon
                        strokeWidth={2}
                        className="h-4 w-4 mr-2 text-green-800"
                      />
                    ) : (
                      <XCircleIcon
                        strokeWidth={2}
                        className="h-4 w-4 mr-2 text-red-500"
                      />
                    )}
                  </span>
                  {task.name}
                </li>
              ))}
            </ul>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data: features,
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <div>
        <Card className="p-4 rounded-md gap-4">
          <div className="py-2">
            <p className="text-xl font-semibold">My Assigned Features</p>
          </div>
          <table
            {...getTableProps()}
            className="w-full table-auto"
            id="myTable"
          >
            {/* Table Headers */}
            <thead className="bg-blue-gray-50">

//               <tr>
//                 {TABLE_HEAD.map((head) => (
//                   <td style={customTableStyles.headCells.style} key={head}>
//                     {head}
//                   </td>
//                 ))}
//               </tr>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{ ...CustomTableStyles.headCells.style }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    onClick={() => handleOpen(row.original)}
                    style={{ ...CustomTableStyles.rows.style }}
                    className="hover:cursor-pointer hover:bg-blue-gray-50 border-b-2"

                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{ ...CustomTableStyles.cells.style }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex space-x-2 justify-end">
            <Button
              onClick={previousPage}
              variant="outlined"
              className="rounded-md"
              size="sm"
              disabled={!canPreviousPage}
            >
              Previous
            </Button>
            <Button
              onClick={nextPage}
              variant="outlined"
              className="rounded-md"
              size="sm"
              disabled={!canNextPage}
            >
              Next
            </Button>
          </div>
        </Card>
      </div>

      {/* Task Modal */}
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
                        class="flex w-full justify-start items-center rounded-none px-2 text-blue-gray-700 outline-none transition-all bg-blue-gray-50"
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
          <div className="">
            <p>Tasks to Accomplish</p>

            {/* List of tasks */}
            <div className="overflow-y-auto w-full scroll-m-1 h-40">
              <div>
                {selectedFeature?.tasks.length > 0 ? (
                  <div className="space-y-3">
                    {selectedFeature.tasks.map((task) => (
                      <div
                        key={task._id}
                        class="flex w-full justify-start items-center rounded-none px-2 text-blue-gray-700 outline-none transition-all bg-blue-gray-50"
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
            {/* <div className="overflow-y-auto scroll-m-1 h-36 bg-gray-300">
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
            </div> */}
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
    </>
  );
};

export default Assigned;
