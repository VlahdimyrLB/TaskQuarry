import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ProjectCard from "../../Components/Admin/Project/ProjectCard";
import NewProjectDialog from "../../Components/Admin/Project/NewProjectDialog";
import SearchBar from "../../Components/Admin/Project/SearchBar";
import { Button, Input } from "@material-tailwind/react";
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

  const handleDialogToggle = () => {
    setIsOpen(!isOpen);
  };

  // porjects data refresher
  const handleProjectCreated = () => {
    fetchProjects();
    setIsOpen(false);
  };

  // For Search Bar
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col">
        <p className="text-xl text-gray-800 font-semibold">Projects</p>
        <div className="flex items-center justify-between mt-3">
          <div>
            <Input
              type="text"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search for a Project"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <Button
            onClick={handleDialogToggle}
            className="flex items-center gap-2"
            size="sm"
          >
            <PlusIcon strokeWidth={2} className="h-5 w-5" /> CREATE NEW PROJECT
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center mt-10 text-lg">
          Loading projects...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 mt-4 lg:grid-cols-2 xl:grid-cols-3">
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
        onClose={handleDialogToggle}
        onProjectCreated={handleProjectCreated}
      />
    </>
  );
};

export default Projects;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import NewProjectDialog from "../../Components/Admin/Project/NewProjectDialog";
// import SearchBar from "../../Components/Admin/Project/SearchBar";
// import { Button, Card } from "@material-tailwind/react";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import { FixedSizeList as List } from "react-window";
// import ProjectCard from "../../Components/Admin/Project/ProjectCard";

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [isDialogOpen, setDialogOpen] = useState(false);

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/projects");
//       setProjects(data.projects);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDialogToggle = () => {
//     setDialogOpen(!isDialogOpen);
//   };

//   const handleProjectCreated = () => {
//     fetchProjects();
//     setDialogOpen(false);
//   };

//   const Row = ({ index, style }) => (
//     <Link
//       key={projects[index]._id}
//       to={`/admin/projects/${projects[index]._id}`}
//     >
//       <div className="p-3" style={style}>
//         <ProjectCard project={projects[index]} />
//       </div>
//     </Link>
//   );

//   return (
//     <>
//       <div className="flex justify-between">
//         <p className="text-xl text-gray-800 font-semibold">Projects</p>
//         <div>
//           <Button
//             onClick={handleDialogToggle}
//             className="flex items-center gap-2"
//             size="sm"
//           >
//             <PlusIcon strokeWidth={2} className="h-5 w-5" /> CREATE NEW PROJECT
//           </Button>
//         </div>
//       </div>
//       <List
//         height={500} // Specify your desired height
//         itemCount={projects.length}
//         itemSize={200} // Specify the size of each item
//         width={"100%"}
//         className="mt-5 "
//       >
//         {Row}
//       </List>
//       <NewProjectDialog
//         projects={projects}
//         isOpen={isDialogOpen}
//         onClose={handleDialogToggle}
//         onProjectCreated={handleProjectCreated}
//       />
//     </>
//   );
// };

// export default Projects;
