import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ViewTaskDialog } from "./ViewTaskDialog";
import { AuthContext } from "../../../App";

//Table columns
const columns = [
  {
    header: "Project Info",
    accessorKey: "parentProject",
    enableSorting: false,
    cell: (props) => (
      <div>
        <p className="font-semibold">{props.getValue().name}</p>
        <p className="text-sm">{props.getValue().description}</p>
        <p className="text-sm">{props.getValue().priority}</p>
        <p className="text-sm">
          {new Date(props.getValue().startDate).toLocaleDateString()} &#8211;{" "}
          {new Date(props.getValue().endDate).toLocaleDateString()}
        </p>
      </div>
    ),
  },
  {
    header: "Feature Name",
    accessorKey: "name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "Due Date",
    accessorKey: "dueDate",
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
  },
  {
    header: "Task to Accomplish",
    accessorKey: "tasks",
    cell: (props) => {
      const tasks = props.getValue();
      if (tasks.length === 0) {
        return <button>No Task Yet</button>;
      }
      return (
        <ul className="space-y-2">
          {tasks.map((task) => (
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
];

export function AssignedTable() {
  // CRUD OPERATION HERE
  const { loggedUser } = useContext(AuthContext);

  // data fetching states
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeatures();
  }, [loggedUser._id]);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(
        `/api/v1/features/withProjectInfo/assigned/${loggedUser._id}`
      );
      setFeatures(response.data.features);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.log("Error fetching features:", error);
    }
  };

  // modal/dialog states
  const [open, setOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("");

  const handleOpen = (feature) => {
    setOpen(!open);
    setSelectedFeature(feature);
  };

  console.log(selectedFeature);
  // TanStack Table handler
  const [columnFilters, setColumnFilters] = useState([]);
  const featureName =
    columnFilters.find((filter) => filter.id === "name")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );
  const table = useReactTable({
    data: features,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <Card className=" w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-2 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Assigned Work list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about your works
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Input
                label="Search Features"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={featureName}
                onChange={(e) => onFilterChange("name", e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-auto px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
                      style={{ width: header.getSize(), position: "relative" }}
                    >
                      <div
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {header.column.columnDef.header}

                        <div className="text-brown-900 font-bold text-sm">
                          {
                            //CODE COMMENTED WILL WORK FOR CUSTOMIZATION
                            {
                              asc: "asc",
                              desc: "desc",
                            }[header.column.getIsSorted()]

                            // header.column.getIsSorted()
                          }
                        </div>

                        {header.column.getCanSort() && (
                          <button
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <ChevronUpDownIcon
                              strokeWidth={2}
                              className="h-5 w-5 hover:opacity-80 transition-colors"
                            />
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => handleOpen(row.original)}
                  className="transition-colors hover:cursor-pointer hover:bg-blue-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="p-4 border-b border-blue-gray-50 "
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Task Dialog */}
      <ViewTaskDialog
        open={open}
        handleOpen={handleOpen}
        selectedFeature={selectedFeature}
      />
    </>
  );
}
