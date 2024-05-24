import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import DataTable from "react-data-table-component";

import { Card, Typography, Button, Textarea } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

// Child Components
import UpdateProjectDialog from "../../Components/Admin/SingleProject/UpdateProjectDialog";
import AddFeatureDialog from "../../Components/Admin/SingleProject/AddFeatureDialog";
import UpdateFeatureDialog from "../../Components/Admin/SingleProject/UpdateFeatureDialog";

const SingleProject = () => {
  const navigate = useNavigate();
  const { projectID } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Single Project
  const [singleProject, setSingleProject] = useState(null);

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`/api/v1/projects/${projectID}`);
      setSingleProject(data.project);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectID]);

  // Fetch Features
  const [features, setFeatures] = useState([]);

  const fetchFeatures = async () => {
    try {
      const { data } = await axios.get(`/api/v1/features/project/${projectID}`);
      setFeatures(data.features);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, [projectID]);

  // Fetch Users
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users`);
      setUsers(data.user);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [projectID]);

  // table for react data table
  const getAssignedToName = (assignedToId) => {
    const user = users.find((user) => user._id === assignedToId);
    return user ? user.name : "Not Assigned";
  };

  const columns = [
    {
      name: <p className="font-bold">Feature</p>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <p className="font-bold">Description</p>,
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: <p className="font-bold">Status</p>,
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: <p className="font-bold">Due Date</p>,
      selector: (row) => row.dueDate,
      format: (row) =>
        row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "No Due",
      sortable: true,
    },
    {
      name: <p className="font-bold">Assigned To</p>,
      selector: (row) => row.assignedTo,
      format: (row) => getAssignedToName(row.assignedTo),
      sortable: true,
    },
  ];

  // PROJECT states and handlers
  // OPEN & UPDATE Project
  const [openProjectToUpdate, setOpenProjectToUpdate] = useState(false);
  const [projectToUpdate, setProjectToUpdate] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
    isDone: false,
  });

  const handleOpenUpdateProject = () => {
    setProjectToUpdate({
      name: singleProject.name,
      description: singleProject.description,
      startDate: new Date(singleProject.startDate).toISOString().split("T")[0],
      endDate: new Date(singleProject.endDate).toISOString().split("T")[0],
      priority: singleProject.priority,
      isDone: singleProject.isDone,
    });
    setOpenProjectToUpdate(!openProjectToUpdate);
  };

  // DELETE Project
  const handleDeleteProject = async () => {
    // if there are associated feature within this project
    if (features.length > 0) {
      const confirmation = window.confirm(
        "This project has associated features. Deleting this project will also delete its features. Are you sure you want to proceed?"
      );
      if (confirmation) {
        try {
          await Promise.all(
            features.map((feature) =>
              axios.delete(`/api/v1/features/${feature._id}`)
            )
          );
          await axios.delete(`/api/v1/projects/${projectID}`);
          navigate("../projects");
        } catch (error) {
          setError(error.message);
        }
      }
    } else {
      const confirmation = window.confirm(
        "Are you sure you want to delete this project?"
      );
      if (confirmation) {
        try {
          await axios.delete(`/api/v1/projects/${projectID}`);
          navigate("../projects");
        } catch (error) {
          setError(error.message);
        }
      }
    }
  };

  // FEATURE states and handlers
  // ADD Feature
  const [openAddFeature, setOpenAddFeature] = useState(false);
  const [newFeature, setNewFeature] = useState({
    name: "",
    description: "",
    status: "Not Yet Started",
    dueDate: null,
    assignedTo: null,
  });

  const handleOpenAddFeature = () => {
    setNewFeature({
      name: "",
      description: "",
      status: "Not Yet Started",
      dueDate: null,
      assignedTo: null,
    });
    setOpenAddFeature(!openAddFeature);
  };

  // UPDATE Feature
  const [openUpdateFeature, setOpenUpdateFeature] = useState(false);
  const [featureToUpdate, setFeatureToUpdate] = useState(null);
  const [updatedFeature, setUpdatedFeature] = useState({
    name: "",
    description: "",
    status: "",
    dueDate: null,
    assignedTo: null,
  });

  const handleOpenFeatureToUpdate = (id) => {
    const selectedFeature = features.find((feature) => feature._id === id);
    setFeatureToUpdate(selectedFeature);

    setUpdatedFeature({
      name: selectedFeature.name,
      description: selectedFeature.description,
      status: selectedFeature.status,
      dueDate: selectedFeature.dueDate
        ? new Date(selectedFeature.dueDate).toLocaleDateString().split("T")[0]
        : null,
      assignedTo: selectedFeature.assignedTo,
    });

    setOpenUpdateFeature(!openUpdateFeature);
  };

  const closeUpdateFeature = () => {
    setOpenUpdateFeature(!openUpdateFeature);
    setOpenUpdateFeature(false);
    setFeatureToUpdate(null);
    setUpdatedFeature({
      name: "",
      description: "",
      status: "",
      dueDate: null,
      assignedTo: null,
    });
  };

  // Date Formatter
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const options = {
      timeZone: "Asia/Manila",
      month: "short",
      day: "numeric",
      year: "numeric",
      // timeZoneName: "short",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-PH", options);
  };

  if (loading || users.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col">
        <Card className="p-5 rounded-md shadow-md bg-white">
          <div>
            <p className="text-lg font-semibold mb-3">Project Information</p>
          </div>

          <div className="grid gap-5 grid-cols-1 items-end sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
            <div className="pt-5">
              <p className="text-xs mb-2 uppercase font-semibold">Project</p>
              <Typography className="border-b-2 ">
                {singleProject.name}
              </Typography>
            </div>

            <div className="col-span-2">
              <p className="text-xs mb-2 uppercase font-semibold">
                Description
              </p>
              <Typography className="border-b-2">
                {singleProject.description}
              </Typography>
            </div>

            <div>
              <p className="text-xs mb-2 uppercase font-semibold">Status</p>
              <Typography
                className={`border-b-2  ${
                  singleProject.isDone ? "text-green-900" : "text-yellow-900"
                }`}
              >
                {singleProject.isDone ? "Done" : "Ongoing"}
              </Typography>
            </div>

            <div className="w-36 md:w-full">
              <p className="text-xs mb-2 uppercase font-semibold">Priority</p>
              <Typography
                className={`border-b-2 text-${
                  singleProject.priority === "Urgent"
                    ? "red-900"
                    : singleProject.priority === "Important"
                    ? "deep-orange-500"
                    : singleProject.priority === "Medium"
                    ? "blue-900"
                    : "light-green-800"
                }`}
              >
                {singleProject.priority}
              </Typography>
            </div>

            <div className="col-span-2 md:col-auto">
              <p className="text-xs mb-2 uppercase font-semibold">
                Date / Duration
              </p>
              <Typography className=" border-b-2">
                {formatDate(singleProject.startDate)} -{" "}
                {formatDate(singleProject.endDate)}
              </Typography>
            </div>
          </div>

          <div className="flex flex-row justify-end items-center mt-3">
            <div className="flex justify-end items-center space-x-2 ">
              <div>
                <Button size="sm" onClick={handleOpenUpdateProject}>
                  Update
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={handleDeleteProject}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-md mt-4">
        <div className="p-2">
          <div className="flex shrink-0 flex-col gap-2 py-5 px-3 justify-between sm:flex-row ">
            <div>
              <p className="text-lg font-semibold">Project Features</p>
            </div>
            <div>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={handleOpenAddFeature}
              >
                <PlusIcon strokeWidth={2} className="h-5 w-5" /> ADD A FEATURE
              </Button>
            </div>
          </div>
          {features.length > 0 ? (
            <DataTable
              columns={columns}
              data={features}
              highlightOnHover
              pointerOnHover
              pagination
              fixedHeader
              onRowClicked={(row) => handleOpenFeatureToUpdate(row._id)}
            />
          ) : (
            <p className="text-center">No Features Data</p>
          )}
        </div>
      </Card>

      {/* PROJECT UPDATE DIALOG */}
      <UpdateProjectDialog
        openProjectToUpdate={openProjectToUpdate}
        handleOpenUpdateProject={handleOpenUpdateProject}
        projectToUpdate={projectToUpdate}
        setProjectToUpdate={setProjectToUpdate}
        fetchProject={fetchProject}
        projectID={projectID}
      />

      {/* FEATURE ADD DIALOG */}
      <AddFeatureDialog
        users={users}
        projectID={projectID}
        openAddFeature={openAddFeature}
        handleOpenAddFeature={handleOpenAddFeature}
        newFeature={newFeature}
        setNewFeature={setNewFeature}
        setError={setError}
        fetchFeatures={fetchFeatures}
      />

      {/* UPDATE FEATURE */}
      <UpdateFeatureDialog
        openUpdateFeature={openUpdateFeature}
        handleOpenFeatureToUpdate={handleOpenFeatureToUpdate}
        featureToUpdate={featureToUpdate}
        updatedFeature={updatedFeature}
        setUpdatedFeature={setUpdatedFeature}
        setError={setError}
        fetchFeatures={fetchFeatures}
        setOpenUpdateFeature={setOpenUpdateFeature}
        users={users}
        closeUpdateFeature={closeUpdateFeature}
        setFeatureToUpdate={setFeatureToUpdate}
        setFeatures={setFeatures}
      />
    </>
  );
};

export default SingleProject;
