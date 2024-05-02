import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../../Components/Admin/Project/ProjectCard";
import NewProjectDialog from "../../Components/Admin/Project/NewProjectDialog";
import SearchBar from "../../Components/Admin/Project/SearchBar";
import { Button, Card } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/projects");
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialogToggle = () => {
    setDialogOpen(!isDialogOpen);
  };

  const handleProjectCreated = () => {
    fetchProjects();
    setDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl text-gray-800 font-semibold">Projects</p>
        <div>
          <Button
            onClick={handleDialogToggle}
            className="flex items-center gap-2"
            size="sm"
          >
            <PlusIcon strokeWidth={2} className="h-5 w-5" /> CREATE NEW PROJECT
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-4 xl:grid-cols-3">
        {projects.map((project) => (
          <Link key={project._id} to={`/admin/projects/${project._id}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
      <NewProjectDialog
        projects={projects}
        isOpen={isDialogOpen}
        onClose={handleDialogToggle}
        onProjectCreated={handleProjectCreated}
      />
    </>
  );
};

export default Projects;
