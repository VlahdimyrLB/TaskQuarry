import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../../Components/Admin/Project/ProjectCard";
import NewProjectDialog from "../../Components/Admin/Project/NewProjectDialog";
import SearchBar from "../../Components/Admin/Project/SearchBar";
import { Button } from "@material-tailwind/react";
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
      <div className="flex">
        <div className="flex-1">
          <SearchBar />
        </div>
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
      <div className="grid grid-cols-4 gap-4 mt-4">
        {projects.map((project) => (
          <Link key={project._id} to={`/admin/projects/${project._id}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
      <NewProjectDialog
        isOpen={isDialogOpen}
        onClose={handleDialogToggle}
        onProjectCreated={handleProjectCreated}
      />
    </>
  );
};

export default Projects;
