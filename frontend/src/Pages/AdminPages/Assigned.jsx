import React, { useState, useEffect } from "react";
import axios from "axios";

const Assigned = ({ loggedUser }) => {
  const [features, setFeatures] = useState([]);

  const fetchFeatures = async () => {
    try {
      // Fetch features based on the logged-in user's ID using Axios
      const response = await axios.get(
        `/api/v1/features/assigned/${loggedUser._id}`
      );
      setFeatures(response.data.features);
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };
  useEffect(() => {
    fetchFeatures();
  }, [loggedUser._id]);

  const formatDate = (dueDate) => {
    if (!dueDate) return "No Due";
    const date = new Date(dueDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div>
      <h2>Assigned Features</h2>
      <table className="w-full table-auto">
        <thead className="bg-blue-gray-50">
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature._id}>
              <td>
                <p>Name: {feature.name}</p>
                <p>Desription: {feature.description}</p>
              </td>
              <td>{feature.status}</td>
              <td>{formatDate(feature.dueDate)}</td>
              <td>
                {feature.tasks.length > 0 ? (
                  <ul>
                    {feature.tasks.map((task) => (
                      <li key={task._id}>
                        <strong>{task.name}</strong> - {task.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No Task Added"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assigned;
