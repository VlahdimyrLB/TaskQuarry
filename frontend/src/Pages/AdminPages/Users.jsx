import axios from "axios";
import { useState, useEffect } from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  Input,
  Checkbox,
} from "@material-tailwind/react";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    isAdmin: false,
  });

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/users", {
        headers: {
          Accept: "application/json",
        },
      });
      setUsers(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/users", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchUsers(); // Pang refresh ito
      setNewUser({
        // Clear form
        name: "",
        username: "",
        password: "",
        isAdmin: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE
  const handleUpdate = async (userId) => {
    try {
      const updatedUser = users.find((user) => user._id === userId);
      await axios.patch(`/api/v1/users/${userId}`, updatedUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchUsers(); // Pang refresh ito
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDelete = async (userId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmed) {
        await axios.delete(`/api/v1/users/${userId}`);
        fetchUsers(); // Pang refresh ito
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full h-auto rounded-md dark:bg-dark-secondary dark:text-[#E6EDF3]">
      <div className="p-4">
        <div className="flex flex-col justify-between space-x-0 md:flex-row md:space-x-4">
          <div>
            <Button
              icon={<PlusIcon />}
              className="mb-3 bg-white border border-gray-300 text-gray-800 rounded-md shadow-sm dark:bg-dark-primary dark:text-[#E6EDF3]"
            >
              Create New User
            </Button>
          </div>
          <div className="w-full shrink-0 md:w-1/4">
            <Input
              className="mb-3 dark:text-[#E6EDF3] dark:border border-white"
              label="Search here..."
              icon={<MagnifyingGlassIcon />}
            />
          </div>
        </div>
        <table className="w-full text-left min-w-max table-auto">
          <thead>
            <tr className="border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-900">
              <th className="p-3">Name</th>
              <th className="p-3">Username</th>
              <th className="p-3">Password</th>
              <th className="p-3">Type</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-y ">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.username}</td>
                <td>{user.password}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td className="">
                  <IconButton
                    variant="text"
                    onClick={() => handleDelete(user._id)}
                  >
                    <TrashIcon className="h-4 w-4 text-gray-800 dark:text-[#E6EDF3]" />
                  </IconButton>
                  <IconButton
                    variant="text"
                    onClick={() => handleUpdate(user._id)}
                  >
                    <PencilIcon className="h-4 w-4 text-gray-800 dark:text-[#E6EDF3]" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Users;
