import { useState, useEffect, useContext } from "react";
import { AssignedTable } from "../../Components/Admin/Assigned/AssignedTable";
import axios from "axios";
import { AuthContext } from "../../App";

const Assigned = () => {
  const { loggedUser } = useContext(AuthContext);
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeatures();
  }, [loggedUser._id]);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(
        `/api/v1/features/withProjectInfo/assigned/${loggedUser._id}`
      );
      setFeatures(response.data.features);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.log("Error fetching features:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <AssignedTable features={features} />
      )}
    </>
  );
};

export default Assigned;
