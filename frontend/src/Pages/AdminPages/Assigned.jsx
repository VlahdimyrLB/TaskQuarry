import { useState, useEffect, useContext } from "react";
import { AssignedTable } from "../../Components/Admin/Assigned/AssignedTable";
import axios from "axios";
import { AuthContext } from "../../App";

const Assigned = () => {
  const { loggedUser } = useContext(AuthContext);
  const [features, setFeatures] = useState([]);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(
        `/api/v1/features/assigned/${loggedUser._id}`
      );
      const featuresWithParentProject = await Promise.all(
        response.data.features.map(async (feature) => {
          const featureWithParentProject = { ...feature };
          const parentProject = await axios.get(
            `/api/v1/projects/${feature.parentProject}`
          );
          featureWithParentProject.parentProject = {
            name: parentProject.data.project.name,
            description: parentProject.data.project.description,
            priority: parentProject.data.project.priority,
          };
          featureWithParentProject.parentProjectPriority =
            parentProject.data.project.priority;
          featureWithParentProject.parentProjectStatus = parentProject.data
            .project.isDone
            ? "Done"
            : "Ongoing";
          return featureWithParentProject;
        })
      );
      setFeatures(featuresWithParentProject);
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, [loggedUser._id]);

  console.log("features", features);

  return (
    <>
      <AssignedTable features={features} />
    </>
  );
};

export default Assigned;
