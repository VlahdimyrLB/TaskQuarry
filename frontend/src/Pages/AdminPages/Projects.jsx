import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, Typography, Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/projects", {
        headers: {
          Accept: "application/json",
        },
      });
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="flex-1">
          <p>Search Bar Diteys</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            className="flex items-center gap-3"
            size="sm"
            // onClick={handleOpen}
          >
            <PlusIcon strokeWidth={2} className="h-5 w-5" /> Create New PROJECT
          </Button>
        </div>
      </div>
      <div className="flex space-x-2 mt-5">
        {projects.map((project) => {
          return (
            <Link key={project._id} to={`/admin/projects/${project._id}`}>
              <Card className="p-4">
                <Typography>
                  Project Name:{" "}
                  <span className="font-bold">{project.name}</span>
                </Typography>
                <p>Description: {project.description}</p>
                <p>Status: {project.isDone === false ? "Ongoing" : "Done"}</p>
                <p>Priority: {project.priority}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Projects;
