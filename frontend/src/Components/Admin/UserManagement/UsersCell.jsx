import React from "react";
import { Avatar, Typography } from "@material-tailwind/react";

const Users = ({ row, defaultUserIcon }) => {
  const isAdmin = row.isAdmin;

  return (
    <div className="flex items-center gap-3">
      <Avatar src={defaultUserIcon} alt={row.name} />
      <div className="flex flex-col">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {row.name}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal opacity-70"
        >
          {isAdmin === "Admin" ? "Admin" : "User"}
        </Typography>
      </div>
    </div>
  );
};

export default Users;
