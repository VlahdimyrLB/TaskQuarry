// ProjectCard.js
import { Card, Typography } from "@material-tailwind/react";

const ProjectCard = ({ project }) => {
  return (
    <>
      {project.isDone ? null : (
        <Card className="bg-[#FBFBFB] transition ease-in-out delay-80 rounded-md hover:bg-blue-gray-50 hover:-translate-y-1 hover:scale-100 duration-300">
          <div className="p-4">
            <Typography>
              <span className="font-bold uppercase">{project.name}</span>
            </Typography>
            <p className="mt-2">{project.description}</p>
          </div>
          <hr className="px-0 border-2" />
          <div className="flex flex-row px-4 py-4 justify-between">
            <div className="flex flex-row space-x-1 items-center">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
              <p>In Progress</p>
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
      )}
    </>
  );
};

export default ProjectCard;
