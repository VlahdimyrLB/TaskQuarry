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
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Checkbox,
  Select,
  Option,
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

  //OPEN CREATE NEW USER DIALOG
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  //OPEN UPDATE USER DIALOG
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(!openUpdate);
  };

  return (
    <>
      <Card className="w-full h-auto rounded-md dark:bg-dark-secondary dark:text-[#E6EDF3] dark:shadow-white dark:shadow-sm">
        <div className="p-4">
          <div className="flex flex-col justify-between space-x-0 md:flex-row md:space-x-4">
            <div>
              <Button
                onClick={handleOpen}
                icon={<PlusIcon />}
                className="mb-3 bg-white border border-gray-300 text-gray-800 rounded-md shadow-sm dark:bg-dark-primary dark:text-[#E6EDF3] dark:shadow-white-sm"
              >
                Create New User
              </Button>
            </div>
            <div className="w-full shrink-0 mb-3 md:w-1/4 md:mb-0">
              <Input
                variant="standard"
                className="mb-3 dark:text-white"
                label="Search here..."
                icon={<MagnifyingGlassIcon />}
              />
            </div>
          </div>
          <table className="w-full text-left min-w-min table-auto text-sm">
            <thead>
              <tr className="border-y border-blue-gray-100 bg-blue-gray-50/50 uppercase dark:bg-blue-gray-900">
                <th className="p-3">Name</th>
                <th className="p-3">Username</th>
                <th className="p-3">Password</th>
                <th className="p-3">Type</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-y">
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

      {/* CREATE NEW USER DIALOG */}
      <Dialog open={open} handler={handleOpen} size="sm" className="p-3">
        <DialogHeader className="text-md text-gray-800 uppercase">
          Create New User
        </DialogHeader>
        <DialogBody className="flex flex-col gap-7">
          <Input label="Enter first name" variant="standard" size="md" />
          <Input label="Enter last name" variant="standard" size="md" />
          <Input label="Enter username" variant="standard" size="md" />
          <Input label="Enter password" variant="standard" size="md" />
          <Input label="Confirm password" variant="standard" size="md" />
          <Select variant="standard" label="Choose role">
            <Option>Administrator</Option>
            <Option>User</Option>
          </Select>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            onClick={handleOpen}
            className="rounded-md"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="filled" onClick={handleOpen} className="rounded-md">
            <span>Create</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* UPDATE USER DIALOG */}
      <Dialog
        open={openUpdate}
        handler={handleOpenUpdate}
        size="sm"
        className="p-3"
      >
        <DialogHeader className="text-md text-gray-800 uppercase">
          Update User
        </DialogHeader>
        <DialogBody className="flex flex-col gap-7">
          <Input value="Enter first name" variant="standard" size="md" />
          <Input label="Enter last name" variant="standard" size="md" />
          <Input label="Enter username" variant="standard" size="md" />
          <Input label="Enter password" variant="standard" size="md" />
          <Input label="Confirm password" variant="standard" size="md" />
          <Select variant="standard" label="Choose role">
            <Option>Administrator</Option>
            <Option>User</Option>
          </Select>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            onClick={handleOpenUpdate}
            className="rounded-md"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="filled"
            onClick={handleOpenUpdate}
            className="rounded-md"
          >
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Users;
