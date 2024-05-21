import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Default Import - Components
import ProjectCard from "../../Components/Admin/Project/ProjectCard";
import NewProjectDialog from "../../Components/Admin/Project/NewProjectDialog";
import PriorityFilter from "../../Components/Admin/Project/PriorityFilter";
import SearchBar from "../../Components/Admin/Project/SearchBar";

// Imports from libraries
import { Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/projects");
      setProjects(data.projects);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // dialog/modal toggle
  const handleDialogToggle = () => {
    setIsOpen(!isOpen);
  };

  // projects data refresher
  const handleProjectCreated = () => {
    fetchProjects();
    setIsOpen(false);
  };

  // For name Search and Status Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (priorityFilter === "" || project.priority === priorityFilter)
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col">
        <p className="text-xl text-gray-800 font-semibold">Projects</p>
        <div className="flex items-center justify-start space-x-2 mt-4 sm:justify-between">
          <div className="flex items-center space-x-2">
            <div>
              <SearchBar
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
              />
            </div>
            <div>
              <PriorityFilter setPriorityFilter={setPriorityFilter} />
            </div>
          </div>

          <Button
            onClick={handleDialogToggle}
            className="flex items-center gap-2 p-3"
            size="sm"
          >
            <PlusIcon strokeWidth={3} className="h-4 w-4" />
            <span className="hidden sm:block">CREATE NEW PROJECT</span>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center mt-10 text-lg">
          Loading projects...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 mt-3 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            filteredProjects.map((project) => (
              <Link key={project._id} to={`/admin/projects/${project._id}`}>
                <ProjectCard project={project} />
              </Link>
            ))
          )}
        </div>
      )}

      <NewProjectDialog
        projects={projects}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDialogToggle={handleDialogToggle}
        handleProjectCreated={handleProjectCreated}
      />
    </>
  );
};

export default Projects;
