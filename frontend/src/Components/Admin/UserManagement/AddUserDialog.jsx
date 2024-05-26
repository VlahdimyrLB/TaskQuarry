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

const AddUserDialog = ({
  users,
  openAddUser,
  setOpenAddUser,
  handleOpenAddUser,
  newUser,
  setNewUser,
  isNameDuplicate,
  setIsNameDuplicate,
  isUsernameDuplicate,
  setIsUsernameDuplicate,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, username } = newUser;

    if (!name.trim() || !username.trim()) {
      console.log("Username and Name Required");
      return;
    }

    // Check for duplicate name or username
    const isNameDuplicate = users.some((user) => user.name === name);
    const isDuplicateUsername = users.some(
      (user) => user.username === username
    );

    if (isNameDuplicate) {
      setIsNameDuplicate(true);
      return;
    } else if (isDuplicateUsername) {
      setIsUsernameDuplicate(true);
      return;
    }

    try {
      await axios.post("/api/v1/users", newUser);
      fetchUsers();

      // close and refresher
      handleOpenAddUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={openAddUser}
      handler={handleOpenAddUser}
      size="sm"
      className="p-3"
    >
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
            value={newUser.isAdmin}
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
            onClick={handleOpenAddUser}
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
  );
};
export default AddUserDialog;
