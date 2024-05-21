import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
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
import { StatusFilter } from "./StatusFilter";
import { AuthContext } from "../../../App";

//Table columns
import { columns } from "./columns";

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
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [featureStatus, setFeatureStatus] = useState("");

  const handleOpen = (feature) => {
    setOpen(!open);
    setSelectedFeature(feature);
    setFeatureStatus(feature.status);
  };

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
          <div className="my-2 flex flex-col lg:flex-row  justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Assigned Work list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about your works
              </Typography>
            </div>
            <div className="flex flex-row shrink-0  gap-2">
              <StatusFilter
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
              />
              <div>
                <Input
                  label="Search Features"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={featureName}
                  onChange={(e) => onFilterChange("name", e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-auto px-0 pb-0">
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
                            // {
                            //   asc: "asc",
                            //   desc: "desc",
                            // }[header.column.getIsSorted()]

                            header.column.getIsSorted()
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
              {isLoading ? (
                <tr>
                  <td className="py-3 my-3 ml-3 text-lg text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
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
                ))
              )}
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
        fetchFeatures={fetchFeatures}
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
        featureStatus={featureStatus}
        setFeatureStatus={setFeatureStatus}
      />
    </>
  );
}
