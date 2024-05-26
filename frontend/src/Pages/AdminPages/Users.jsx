import { useEffect, useState, useContext } from "react";
import axios from "axios";

import {
  Card,
  Input,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import DataTable from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import CustomTableStyles from "../../Components/Shared/CustomTableStyles";
import ActionsCell from "../../Components/Admin/UserManagement/ActionsCell";
import RolesCell from "../../Components/Admin/UserManagement/RolesCell";
import defaultUserIcon from "../../Assets/images/user.png";
import UsersCell from "../../Components/Admin/UserManagement/UsersCell";

import AddUserDialog from "../../Components/Admin/UserManagement/AddUserDialog";

import { AuthContext } from "../../App";

createTheme("custom", {
  background: {
    default: "transparent",
  },
});

const Users = () => {
  const { loggedUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/users", {
        headers: {
          Accept: "application/json",
        },
      });

      setUsers(data.user);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Table Info
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <p className="w-30">{row.name}</p>,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
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

  // Add Task related handler and states
  const [openAddUser, setOpenAddUser] = useState(false);
  const [isNameDuplicate, setIsNameDuplicate] = useState(false);
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    isAdmin: "User",
  });

  const handleOpenAddUser = () => {
    setIsNameDuplicate(false);
    setIsUsernameDuplicate(false);
    setNewUser({
      name: "",
      username: "",
      password: "",
      isAdmin: "User",
    });
    setOpenAddUser(!openAddUser);
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
        <div className="flex flex-col justify-between">
          <div className="mb-6 flex items-center justify-between gap-8 px-4 mt-5">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all users
              </Typography>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-4 px-2 mb-3">
            <div className="w-full md:w-auto">
              <Input
                label="Search for Users"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={handleSearch}
              />
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={handleOpenAddUser}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4 my-1" />
                <span className="hidden md:block">Create New User</span>
              </Button>
            </div>
          </div>
        </div>
        <DataTable
          className="overflow-y-auto"
          columns={columns}
          data={filteredUsers}
          customStyles={CustomTableStyles}
          pagination
          fixedHeader
          theme="custom" // Apply custom theme to fix background color issue
        />
      </Card>

      {/* CREATE/ADD NEW USER DIALOG */}
      <AddUserDialog
        users={users}
        fetchUsers={fetchUsers}
        openAddUser={openAddUser}
        setOpenAddUser={setOpenAddUser}
        newUser={newUser}
        setNewUser={setNewUser}
        handleOpenAddUser={handleOpenAddUser}
        isNameDuplicate={isNameDuplicate}
        setIsNameDuplicate={setIsNameDuplicate}
        isUsernameDuplicate={isUsernameDuplicate}
        setIsUsernameDuplicate={setIsUsernameDuplicate}
      />

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
