import axios from "axios";

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import userIcon from "../../Assets/images/icon.jpg";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "User",
    value: "User",
  },
];

const TABLE_HEAD = ["Name", "Username", "Password", "Type", ""];

const Users = () => {
  const [users, setUsers] = useState([]); // users list
  const [isNameDuplicate, setIsNameDuplicate] = useState(false);
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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

  //OPEN CREATE NEW USER DIALOG
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  // CREATE/ADD HANDLER
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    isAdmin: false,
    image: "",
  });

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

      fetchUsers(); // refreh table
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

  // OPEN UPDATE DIALOG
  const [toUpdateUser, setToUpdateUser] = useState(null);
  const handleOpenUpdate = (id) => {
    const userToUpdate = users.find((user) => user._id === id);
    setToUpdateUser(userToUpdate);
  };

  // HANDLE CHANGE
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setToUpdateUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // HANDLE UPDATE TO DB
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Check for duplicate name or username
    const isDuplicateName = users.some(
      (user) => user.name === toUpdateUser.name && user._id !== toUpdateUser._id
    );
    const isDuplicateUsername = users.some(
      (user) =>
        user.username === toUpdateUser.username && user._id !== toUpdateUser._id
    );

    if (isDuplicateName || isDuplicateUsername) {
      // Handle duplicate name or username
      console.log("Duplicate name or username detected");
      return;
    }

    try {
      await axios.patch(`/api/v1/users/${toUpdateUser._id}`, toUpdateUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchUsers(); // Refresh user data
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

  return (
    <>
      <Card className="w-full shadow-lg dark:bg-dark-secondary dark:text-[#E6EDF3] dark:shadow-white dark:shadow-sm">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none dark:bg-dark-secondary dark:text-[#E6EDF3] dark:shadow-white dark:shadow-sm"
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all users
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={handleOpen}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create New
                User
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>

        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={user._id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <Avatar
                            src={`data:image/jpeg;base64,${user.image.data}`}
                            alt={user.name}
                          />
                        ) : (
                          <Avatar src={userIcon} alt={user.name} />
                        )}
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {user.isAdmin ? "Admin" : "User"}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.username}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.password}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={user.isAdmin ? "Admin" : "User"}
                          color={user.isAdmin ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Delete User">
                        <IconButton
                          variant="text"
                          onClick={() => handleDelete(user._id)}
                        >
                          <TrashIcon className="h-4 w-4 text-gray-800 dark:text-[#E6EDF3]" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Edit User">
                        <IconButton
                          variant="text"
                          onClick={() => handleOpenUpdate(user._id)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
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
              error={isUsernameDuplicate ? true : false}
              className={isUsernameDuplicate ? "text-red-500" : ""}
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
            <Select variant="standard" label="Automatically User Only Access">
              <Option value="User" aria-selected>
                User Only Access
              </Option>
            </Select>

            <p className="text-red-700 text-center">
              {isNameDuplicate ? "Duplicate Data Entry" : ""}
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
        open={!!toUpdateUser}
        handler={() => setToUpdateUser(null)}
        size="sm"
        className="p-3"
      >
        <DialogHeader className="text-md text-gray-800 uppercase">
          Update User
        </DialogHeader>
        {toUpdateUser ? (
          <form onSubmit={handleUpdate}>
            {toUpdateUser ? (
              <DialogBody className="flex flex-col gap-7">
                <Input
                  label="Enter Full Name"
                  variant="standard"
                  size="md"
                  name="name"
                  value={toUpdateUser.name}
                  onChange={handleChangeUpdate}
                  error={isNameDuplicate ? true : false}
                  className={isNameDuplicate ? "text-red-500" : ""}
                />
                <Input
                  label="Enter Username"
                  variant="standard"
                  size="md"
                  name="username"
                  value={toUpdateUser.username}
                  onChange={handleChangeUpdate}
                  error={isNameDuplicate ? true : false}
                  className={isNameDuplicate ? "text-red-500" : ""}
                />
                <Input
                  label="Enter Password"
                  variant="standard"
                  size="md"
                  name="password"
                  value={toUpdateUser.password}
                  onChange={handleChangeUpdate}
                />

                <Select
                  variant="standard"
                  label="User Type"
                  name="isAdmin"
                  value={toUpdateUser.isAdmin ? "Admin" : "User"}
                  onChange={handleChangeUpdate}
                >
                  <Option value="User">User Only Access</Option>
                  <Option value="Admin">Admin Access</Option>
                </Select>
              </DialogBody>
            ) : null}
            <DialogFooter className="space-x-2">
              <Button
                variant="outlined"
                onClick={() => setToUpdateUser(null)}
                className="rounded-md hover:text-red-700 hover:border-red-700"
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                type="submit"
                className="rounded-md hover:opacity-75"
              >
                Save
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
