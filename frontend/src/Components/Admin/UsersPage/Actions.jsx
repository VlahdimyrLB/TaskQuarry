import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Tooltip, IconButton } from "@material-tailwind/react";
const Actions = ({ row, handleDelete, handleOpenUpdate }) => {
  return (
    <div>
      <Tooltip content="Delete User">
        <IconButton variant="text" onClick={() => handleDelete(row._id)}>
          <TrashIcon className="h-4 w-4 text-gray-800 dark:text-[#E6EDF3]" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Edit User">
        <IconButton variant="text" onClick={() => handleOpenUpdate(row._id)}>
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Actions;
