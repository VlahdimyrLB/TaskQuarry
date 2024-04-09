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
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  HomeIcon,
  UserCircleIcon,
  ClockIcon,
  FolderIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Sidebar = ({ isOpen, close }) => {
  //HANDLE STATE FOR TASK MANAGEMENT ACCORDION
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      {/* TO DO: ADD ANIMATION FOR SIDEBAR CLOSE/OPEN */}
      <div
        id="drawer-example"
        className={`h-screen max-w-[16rem] shadow-xl bg-[#1B1B1B] rounded-0 md:block ${
          isOpen
            ? "block fixed top-0 left-0 z-50 md:static md:h-auto md:max-h-none"
            : "hidden"
        }`}
      >
        <div className="flex justify-between items-center h-12 bg-[#282828]">
          <div className="flex ml-[17px]">
            <p className="text-lg text-white font-bold">TaskQuarry</p>
          </div>
          <div className="flex items-center mr-1 md:hidden">
            <IconButton variant="text" size="md" onClick={close}>
              <XMarkIcon className="h-7 w-7 stroke-1 text-white" />
            </IconButton>
          </div>
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
          </List>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
