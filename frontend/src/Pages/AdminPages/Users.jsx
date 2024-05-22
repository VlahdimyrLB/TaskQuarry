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
import { useEffect, useState, useContext } from "react";
// import { useReactTable } from "@tanstack/react-table";
import DataTable from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import CustomTableStyles from "../../Components/Shared/CustomTableStyles";
import defaultUserIcon from "../../Assets/images/user.png";
import ActionsCell from "../../Components/Admin/UserManagement/ActionsCell";
import RolesCell from "../../Components/Admin/UserManagement/RolesCell";
import UsersCell from "../../Components/Admin/UserManagement/UsersCell";

import { AuthContext } from "../../App";

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

const TABLE_HEAD = ["Name", "Username", "Password", "Type", "Actions"];
createTheme("custom", {
  background: {
    default: "transparent",
  },
});
const Users = () => {
  const { loggedUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]); // users list
  const [isNameDuplicate, setIsNameDuplicate] = useState(false);
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);
  // const [userIcon, setUserIcon] = useState(defaultUserIcon);

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

  //OPEN CREATE NEW USER DIALOG
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    //prevent keeping the uploaded image in preview without submission (suggest other approach)
    // setUserIcon(defaultUserIcon);
    setIsNameDuplicate(false);
    setIsUsernameDuplicate(false);
    setNewUser(!newUser);
  };

  const columns = [
    {
      //TO FIX: causes deprecated warning, should use selector function
      name: "Name",
      selector: (row) => (
        <UsersCell row={row} defaultUserIcon={defaultUserIcon} />
      ),
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Password",
      selector: (row) => row.password,
    },
    {
      name: "Role",
      selector: (row) => <RolesCell isAdmin={row.isAdmin} />,
    },
    {
      name: "Actions",
      selector: (row) => (
        <ActionsCell
          row={row}
          handleDelete={handleDelete}
          handleOpenUpdate={handleOpenUpdate}
        />
      ),
    },
  ];

  // CREATE/ADD HANDLER
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    isAdmin: "User",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, username } = newUser;

    if (!name.trim() || !username.trim()) {
      // Validation: Name and Username are required
      return;
    }

    // Check for duplicate name
    const isNameDuplicate = users.some((user) => user.name === name);
    if (isNameDuplicate) {
      setIsNameDuplicate(true);
      return;
    }

    // Check for duplicate username
    const isDuplicateUsername = users.some(
      (user) => user.username === username
    );
    if (isDuplicateUsername) {
      setIsUsernameDuplicate(true);
      return;
    }

    try {
      await axios.post("/api/v1/users", newUser);
      fetchUsers();
      setNewUser({
        name: "",
        username: "",
        password: "",
        isAdmin: "User",
      });

      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  // OPEN UPDATE DIALOG
  const [toUpdateUser, setToUpdateUser] = useState(null);

  const handleOpenUpdate = (id) => {
    const userToUpdate = users.find((user) => user._id === id);
    setToUpdateUser(userToUpdate);
    setIsNameDuplicate(false);
    setIsUsernameDuplicate(false);
  };

  // HANDLE CHANGE UPDATE
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setToUpdateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSelect = (value) => {
    setToUpdateUser((prevUser) => ({
      ...prevUser,
      isAdmin: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { _id, name, username, password, isAdmin } = toUpdateUser;

    if (!name.trim() || !username.trim()) {
      // Validation: Name and Username are required
      return;
    }

    // Check for duplicate name
    const isNameDuplicate = users.some(
      (user) => user.name === name && user._id !== _id
    );
    if (isNameDuplicate) {
      setIsNameDuplicate(true);
      return;
    }

    // Check for duplicate username
    const isDuplicateUsername = users.some(
      (user) => user.username === username && user._id !== _id
    );
    if (isDuplicateUsername) {
      setIsUsernameDuplicate(true);
      return;
    }

    try {
      await axios.patch(`/api/v1/users/${_id}`, {
        name,
        username,
        password,
        isAdmin: toUpdateUser.isAdmin,
      });
      fetchUsers();
      setToUpdateUser(null);
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
        // Check if the user being deleted is the same as the logged-in user
        if (userId === loggedUser._id) {
          // Display a message or prevent deletion
          alert("You cannot delete your own account.");
          return;
        }

        await axios.delete(`/api/v1/users/${userId}`);
        fetchUsers(); // Pang refresh ito
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term
  const [filteredUsers, setFilteredUsers] = useState([]); // State to hold filtered users

  // Function to filter users based on search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <>
      <Card className="w-full shadow-lg p-2 dark:bg-dark-secondary dark:text-[#E6EDF3] dark:shadow-white dark:shadow-sm">
        <div className="mb-8 flex items-center justify-between gap-8 px-4 mt-5">
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
        <div className="flex flex-col items-center justify-end gap-4 md:flex-row px-4 mb-2">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={handleSearch}
            />
          </div>
        </div>
        <DataTable
          className="overflow-hidden"
          columns={columns}
          data={filteredUsers} // Use filteredUsers instead of users
          customStyles={CustomTableStyles}
          pagination
          fixedHeader
          theme="custom" // Apply custom theme to fix background color issue
        />
      </Card>

      {/* CREATE NEW USER DIALOG */}
      <Dialog open={open} handler={handleOpen} size="sm" className="p-3">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-md text-gray-800 uppercase mt-2">
            Create New User
          </DialogHeader>
          <DialogBody className="flex flex-col gap-7">
            {/* <div className="flex justify-center items-center">
                <div className="relative inline-block">
                  <img
                    src={userIcon}
                    className="h-44 w-44 rounded-full"
                    alt="User Icon"
                  />
                  <Tooltip content="Upload an image">
                    <span
                      onClick={handleUploadClick}
                      className="absolute flex bottom-0 right-0 bg-dark-secondary text-white h-10 w-10 border-4 border-white rounded-full cursor-pointer items-center justify-center"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </span>
                  </Tooltip>
                </div>
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                ref={imageUploadRef}
                hidden
              /> */}
            <Input
              label="Enter Full Name"
              variant="standard"
              size="md"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              error={isNameDuplicate ? true : false}
              className={isNameDuplicate ? "text-red-500" : ""}
              required
            />
            <Input
              label="Enter Username"
              variant="standard"
              size="md"
              name="username"
              value={newUser.username}
              onChange={handleChange}
              error={isUsernameDuplicate ? true : false}
              className={isUsernameDuplicate ? "text-red-500" : ""}
              required
            />
            <Input
              label="Enter Password"
              variant="standard"
              size="md"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              required
            />

            <Select
              variant="standard"
              label="Automatically User Only Access"
              name="isAdmin"
              value={newUser.isAdmin} // Reflect the state value here
              onChange={(e) =>
                setNewUser((prevState) => ({
                  ...prevState,
                  isAdmin: e.target.value,
                }))
              }
            >
              <Option value="User">User Only Access</Option>
              <Option value="Admin">Admin Access</Option>
            </Select>

            <p className="text-red-700 text-center">
              {isNameDuplicate || isUsernameDuplicate
                ? "Duplicate Data Entry"
                : ""}
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
                  error={isUsernameDuplicate ? true : false}
                  className={isUsernameDuplicate ? "text-red-500" : ""}
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
                  value={toUpdateUser.isAdmin}
                  onChange={handleSelect}
                >
                  <Option value="User">User Only Access</Option>
                  <Option value="Admin">Admin Access</Option>
                </Select>

                <p className="text-red-700 text-center">
                  {isNameDuplicate || isUsernameDuplicate
                    ? "Duplicate Data Entry"
                    : ""}
                </p>
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
