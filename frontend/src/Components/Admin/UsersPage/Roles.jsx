import React from "react";
import { Chip } from "@material-tailwind/react";
const Roles = ({ isAdmin }) => {
  <div>
    {isAdmin ? (
      <Chip variant="filled" size="sm" value="Admin" color="green" />
    ) : (
      <Chip variant="filled" size="sm" value="User" color="blue-gray" />
    )}
  </div>;
};

export default Roles;
