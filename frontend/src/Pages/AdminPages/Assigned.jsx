import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, Button } from "@material-tailwind/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useTable, useSortBy, usePagination } from "react-table";

import CustomTableStyles from "../../Components/Shared/CustomTableStyles";
import ViewTaskDialog from "../../Components/Admin/Assigned/ViewTaskDialog";

import { AuthContext } from "../../App";

const Assigned = () => {
  const { loggedUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [status, setStatus] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [taskUpdates, setTaskUpdates] = useState({});

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

  useEffect(() => {
    fetchFeatures();
  }, [loggedUser._id]);

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

  const columns = React.useMemo(
    () => [
      {
        Header: "Parent Project",
        accessor: "parentProject",
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

      <ViewTaskDialog
        open={open}
        handleClose={handleClose}
        formatDate={formatDate}
        status={status}
        setStatus={setStatus}
        taskUpdates={taskUpdates}
        fetchFeatures={fetchFeatures}
        newTaskName={newTaskName}
        setNewTaskName={setNewTaskName}
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
      />
    </>
  );
};

export default Assigned;
