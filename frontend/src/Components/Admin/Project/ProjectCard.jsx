// ProjectCard.js
import { Card, Typography } from "@material-tailwind/react";

const ProjectCard = ({ project }) => {
  return (
    <Card className="p-4">
      <Typography>
        Project Name: <span className="font-bold">{project.name}</span>
      </Typography>
      <p>Description: {project.description}</p>
      <p>Status: {project.isDone ? "Done" : "Ongoing"}</p>
      <p>
        Priority:{" "}
        <span
          className={`text-${
            project.priority === "Urgent"
              ? "red-900"
              : project.priority === "Important"
              ? "deep-orange-500"
              : project.priority === "Medium"
              ? "blue-900"
              : "green-900"
          }`}
        >
          {project.priority}
        </span>
      </p>
    </Card>
  );
};

export default ProjectCard;
