import { useState, useEffect } from "react";
import axios from "axios";
import DashboardCard from "../../Components/Admin/Dashboard/DashboardCard";
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [projectCount, setProjectCount] = useState(null);
  const [featureCount, setFeatureCount] = useState(null);
  const [taskCount, setTaskCount] = useState(null);
  const [userCount, setUserCount] = useState(null);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/projects");
      setProjectCount(data.projects.length);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchFeatures = async () => {
    try {
      const { data } = await axios.get("/api/v1/features");
      setFeatureCount(data.features.length);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/users");
      setUserCount(data.user.length);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/api/v1/features/tasks");
      setTaskCount(data.allTasks.length);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <DashboardCard
          logo={"LOGO"}
          title={"Total Project Count"}
          data={projectCount}
        />
        <DashboardCard
          logo={"LOGO"}
          title={"Total Feature Count"}
          data={featureCount}
        />
        <DashboardCard
          logo={"LOGO"}
          title={"Total Tasks Count"}
          data={taskCount}
        />
        <DashboardCard
          logo={"LOGO"}
          title={"Number of Users"}
          data={userCount}
        />
      </div>
    </>
  );
};
export default Dashboard;
