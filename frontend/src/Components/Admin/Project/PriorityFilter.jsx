import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FunnelIcon } from "@heroicons/react/24/solid";

const PriorityFilter = ({ setPriorityFilter }) => {
  return (
    <Menu>
      <MenuHandler>
        <Button className="p-3">
          <FunnelIcon className="h-4 w-4" />
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={() => setPriorityFilter("")}>All</MenuItem>
        <MenuItem onClick={() => setPriorityFilter("Urgent")}>Urgent</MenuItem>
        <MenuItem onClick={() => setPriorityFilter("Important")}>
          Important
        </MenuItem>
        <MenuItem onClick={() => setPriorityFilter("Medium")}>Medium</MenuItem>
        <MenuItem onClick={() => setPriorityFilter("Low")}>Low</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PriorityFilter;
