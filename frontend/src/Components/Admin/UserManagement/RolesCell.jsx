import React from "react";
import { Chip } from "@material-tailwind/react";
const Roles = ({ isAdmin }) => {
  return (
    <div className="w-max">
      <Chip
        variant="ghost"
        size="sm"
        value={isAdmin === "Admin" ? "Admin" : "User"}
        color={isAdmin === "Admin" ? "green" : "blue-gray"}
      />
    </div>
  );
};

export default Roles;
