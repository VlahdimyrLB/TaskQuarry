// ProjectCard.js
import { Card, Typography } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/solid";

const ProjectCard = ({ project }) => {
  const formatDate = (date, options) => {
    return new Date(date).toLocaleDateString("en-PH", options);
  };
  const startDate = formatDate(project.startDate, {
    month: "short",
    day: "numeric",
  });
  const endDate = formatDate(project.endDate, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {/* {project.isDone ? null : ( */}
      <Card
        className={`flex flex-colbg-[#FBFBFB] transition ease-in-out delay-80 rounded-md hover:bg-blue-gray-50 hover:-translate-y-1 hover:scale-100 duration-300 h-48 ${
          project.isDone ? "bg-green-50" : ""
        } `}
      >
        <div className="p-4 flex-grow">
          <div className="flex items-center justify-between">
            <Typography>
              <span className="font-bold uppercase flex justify-between">
                {project.name}
                {project.isDone ? (
                  <CheckIcon
                    strokeWidth={4}
                    className="h-5 w-5 text-green-900"
                  />
                ) : (
                  ""
                )}
              </span>
            </Typography>
            <Typography className="text-sm text-gray-700">
              Due: {endDate}
            </Typography>
          </div>
          <p className="mt-3">{project.description}</p>
        </div>
        <hr className="px-0 border-2" />

        <div className="flex flex-row px-4 py-4 justify-between h-16">
          <div className="flex flex-row space-x-1 items-center">
            {project.isDone ? (
              <>
                <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
                <p>Done</p>
              </>
            ) : (
              <>
                <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
                <p>Ongoing</p>
              </>
            )}
          </div>
          <div>
            <p>
              Priority:{" "}
              <span
                className={`text-white p-2 rounded-full uppercase tracking-[0.13em] font-semibold text-xs ${
                  project.priority === "Urgent"
                    ? "bg-red-800"
                    : project.priority === "Important"
                    ? "bg-deep-orange-500"
                    : project.priority === "Medium"
                    ? "bg-blue-800"
                    : "bg-green-800"
                }`}
              >
                {project.priority}
              </span>
            </p>
          </div>
        </div>
      </Card>
      {/* )} */}
    </>
  );
};

export default ProjectCard;
