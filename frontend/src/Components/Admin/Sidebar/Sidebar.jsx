import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  HomeIcon,
  UserCircleIcon,
  ClockIcon,
  FolderIcon,
  PowerIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div className="hidden h-screen max-w-[16rem] shadow-xl bg-[#1B1B1B] rounded-0 md:block">
      <div className="flex justify-center items-center h-12 bg-[#282828]">
        <p className="text-lg text-white font-bold">TaskQuarry</p>
      </div>
      <div className="p-2 text-white">
        <List className="text-white text-sm">
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5 " />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`text-white mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="text-white h-5 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto text-sm">
                  Task Management
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 text-white text-sm">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Create Task
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Task List
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Contributors
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 " />
            </ListItemPrefix>
            User Management
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <FolderIcon className="h-5 w-5 " />
            </ListItemPrefix>
            Reports
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ClockIcon className="h-5 w-5 " />
            </ListItemPrefix>
            History
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 " />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
