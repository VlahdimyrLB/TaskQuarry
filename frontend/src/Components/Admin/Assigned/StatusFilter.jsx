import React, { useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  List,
  ListItem,
} from "@material-tailwind/react";
import { FunnelIcon } from "@heroicons/react/24/solid";

const STATUS = [
  { name: "Not Yet Started" },
  { name: "In Progress" },
  { name: "Done" },
];

export function StatusFilter({ setColumnFilters }) {
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStatusClick = (status) => {
    if (selectedStatus === status.name) {
      // If the same status is clicked again, reset the filters
      setColumnFilters((prev) =>
        prev.filter((filter) => filter.id !== "status")
      );
      setSelectedStatus(null);
    } else {
      // Set the filter and mark the status as selected
      setColumnFilters((prev) => [
        ...prev.filter((filter) => filter.id !== "status"),
        {
          id: "status",
          value: status.name,
        },
      ]);
      setSelectedStatus(status.name);
    }
  };

  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Button className="flex items-center bg-blue-gray-800 px-3 max-h-10">
          <FunnelIcon className="h-4 w-4 mr-1" />
          <p>Filter</p>
        </Button>
      </PopoverHandler>
      <PopoverContent className="px-0 py-0">
        <div className="pt-2 pl-2 text-md font-bold">Filter by:</div>
        <div className="pt-2 pl-2 text-sm font-semibold">Status</div>
        <ul className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          {STATUS.map((status, index) => (
            <li
              key={index}
              onClick={() => handleStatusClick(status)}
              selected={selectedStatus === status.name}
              className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 cursor-pointer ${
                selectedStatus === status.name ? "bg-blue-gray-50 " : ""
              }`}
            >
              {status.name}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
