import React from "react";

import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

export const columns = [
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
    cell: (props) => (
      <div>
        <p className="font-semibold">{props.getValue()}</p>
      </div>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (props) => {
      const tasks = props.getValue();
      return (
        <div className="w-32">
          <div className="flex items-center gap-2">
            {tasks === "Not Yet Started" ? (
              <div className="bg-gray-700 w-3 h-3 rounded-full"></div>
            ) : tasks === "In Progress" ? (
              <div className="bg-orange-700 w-3 h-3 rounded-full"></div>
            ) : (
              <div className="bg-blue-700 w-3 h-3 rounded-full"></div>
            )}
            {tasks}
          </div>
        </div>
      );
    },
  },
  {
    header: "Due Date",
    accessorKey: "dueDate",
    cell: (props) => {
      const date = props.getValue();
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "No Due";
      const iconClass = date ? "w-5 h-5 mr-2 text-brown-700" : ""; // Conditionally apply the class for clock icon
      return (
        <p className="flex items-center w-32">
          {date && <ClockIcon className={iconClass} />}{" "}
          {/* Render clock icon only if date exists */}
          {formattedDate}
        </p>
      );
    },
  },
  {
    header: "Task to Accomplish",
    accessorKey: "tasks",
    cell: (props) => {
      const tasks = props.getValue();
      if (tasks.length === 0) {
        return <p className="pl-3 p-1">No Task Yet</p>;
      }
      return (
        <ul className="space-y-1">
          {tasks.map((task) => (
            <li
              key={task._id}
              // className={`flex items-center  pl-2 p-1 rounded-lg ${
              //   task.isDone === true ? "bg-green-50" : "bg-red-50"
              // } `}
              className="flex items-center  pl-2 p-1"
            >
              <span>
                {task.isDone === true ? (
                  <CheckCircleIcon
                    strokeWidth={2}
                    className="h-5 w-5 mr-2 text-green-700"
                  />
                ) : (
                  <XCircleIcon
                    strokeWidth={2}
                    className="h-5 w-5 mr-2 text-red-700"
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
