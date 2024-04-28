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

import userIcon from "../../Assets/images/icon.jpg";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isNameDuplicate, setIsNameDuplicate] = useState(false);
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [toUpdateUser, setToUpdateUser] = useState({
    name: "",
    username: "",
    password: "",
    isAdmin: false,
  });

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
    // Reset duplicate indicators when user updates the input
    setIsNameDuplicate(false);
    setIsUsernameDuplicate(false);
  };

  // Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setNewUser({ ...newUser, image: file });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newUser.name);
      formData.append("username", newUser.username);
      formData.append("password", newUser.password);
      formData.append("image", newUser.image);

      await axios.post("/api/v1/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchUsers();
      setNewUser({
        name: "",
        username: "",
        password: "",
        isAdmin: false,
        image: "",
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
      console.log("Error updating user:", error);
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

  //OPEN UPDATE USER DIALOG added id in params to get the clciked user
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = (id) => {
    setOpenUpdate(!openUpdate);
    const userToUpdate = users.find((user) => user._id === id);
    console.log("User:", userToUpdate);
    setToUpdateUser(userToUpdate);
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
                  <td className="p-3">
                    {user.image ? (
                      <Avatar
                        src={`data:image/jpeg;base64,${user.image.data}`}
                        alt={user.name}
                      />
                    ) : (
                      <Avatar src={userIcon} alt={user.name} />
                    )}
                    {user.name}
                  </td>
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
                      onClick={() => handleOpenUpdate(user._id)}
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
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-md text-gray-800 uppercase">
            Create New User
          </DialogHeader>
          <DialogBody className="flex flex-col gap-7">
            <Input type="file" onChange={handleImageChange} />

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="preview-image w-20"
              />
            )}

            <Input
              label="Enter Full Name"
              variant="standard"
              size="md"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              error={isNameDuplicate ? true : false}
              className={isNameDuplicate ? "text-red-500" : ""}
              required
            />
            <Input
              label="Enter Username"
              variant="standard"
              size="md"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              error={isNameDuplicate ? true : false}
              className={isNameDuplicate ? "text-red-500" : ""}
              required
            />
            <Input
              label="Enter Password"
              variant="standard"
              size="md"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />
            <Select
              variant="standard"
              label="Automatically Selected to User Only"
            >
              <Option disabled>User Only Access</Option>
            </Select>

            <p className="text-red-700 text-center">
              {isNameDuplicate ? "Name or Username Duplicate" : ""}
            </p>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              variant="outlined"
              onClick={handleOpen}
              className="rounded-md hover:text-red-700 hover:border-red-700"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="filled"
              type="submit"
              className="rounded-md hover:opacity-75"
            >
              <span>Create</span>
            </Button>
          </DialogFooter>
        </form>
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
        {toUpdateUser ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(toUpdateUser._id);
            }}
          >
            <DialogBody className="flex flex-col gap-7">
              <Input
                label="Enter Full Name"
                variant="standard"
                size="md"
                value={toUpdateUser.name}
                onChange={(e) =>
                  setToUpdateUser({ ...toUpdateUser, name: e.target.value })
                }
                error={isNameDuplicate ? true : false}
                className={isNameDuplicate ? "text-red-500" : ""}
              />
              <Input
                label="Enter Username"
                variant="standard"
                size="md"
                value={toUpdateUser.username}
                onChange={(e) =>
                  setToUpdateUser({ ...toUpdateUser, username: e.target.value })
                }
                error={isNameDuplicate ? true : false}
                className={isNameDuplicate ? "text-red-500" : ""}
              />
              <Input
                label="Enter Password"
                variant="standard"
                size="md"
                value={toUpdateUser.password}
                onChange={(e) =>
                  setToUpdateUser({ ...toUpdateUser, password: e.target.value })
                }
              />

              <Select
                variant="standard"
                label="Automatically Selected to User Only"
                value={toUpdateUser.isAdmin ? "Admin" : "User"}
                onChange={(e) =>
                  setToUpdateUser({
                    ...toUpdateUser,
                    isAdmin: e.target.value === "Admin",
                  })
                }
              >
                <Option value="User">User Only Access</Option>
                <Option value="Admin">Admin Access</Option>
              </Select>

              <p className="text-red-700 text-center">
                {isNameDuplicate ? "Name or Username Duplicate" : ""}
              </p>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button
                variant="outlined"
                onClick={handleOpenUpdate}
                className="rounded-md hover:text-red-700 hover:border-red-700"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="filled"
                type="submit"
                className="rounded-md hover:opacity-75"
              >
                <span>Save</span>
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <p>User not found</p>
        )}
      </Dialog>
    </>
  );
};

export default Users;
