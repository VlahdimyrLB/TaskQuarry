// ProjectCard.js
import { Card, Typography } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/solid";

const ProjectCard = ({ project }) => {
  return (
    <>
      {/* {project.isDone ? null : ( */}
      <Card className="bg-[#FBFBFB] transition ease-in-out delay-80 rounded-md hover:bg-blue-gray-50 hover:-translate-y-1 hover:scale-100 duration-300">
        <div className="p-4">
          <Typography>
            <span className="font-bold uppercase flex justify-between">
              {project.name}
              {project.isDone ? (
                <CheckIcon strokeWidth={4} className="h-5 w-5 text-green-900" />
              ) : (
                ""
              )}
            </span>
          </Typography>
          <p className="mt-2">{project.description}</p>
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
      </Card>
      {/* )} */}
    </>
  );
};

export default ProjectCard;
