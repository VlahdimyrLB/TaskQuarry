import axios from "axios";

import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";

const UpdateUserDialog = ({
  users,
  fetchUsers,
  toUpdateUser,
  setToUpdateUser,
  isNameDuplicate,
  setIsNameDuplicate,
  isUsernameDuplicate,
  setIsUsernameDuplicate,
}) => {
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setToUpdateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
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
  return (
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
                onChange={handleSelectChange}
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
  );
};
export default UpdateUserDialog;
