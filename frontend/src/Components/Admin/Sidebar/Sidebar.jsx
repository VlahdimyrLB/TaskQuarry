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
  Cog8ToothIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, close }) => {
  //HANDLE STATE FOR TASK MANAGEMENT ACCORDION
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      {/* Dark ovrlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-gray-900 opacity-30 z-40"
            onClick={close}
          ></div>
        </>
      )}

      {/* TO DO: ADD ANIMATION FOR SIDEBAR CLOSE/OPEN */}
      <div
        className={`h-screen max-w-[16rem] shadow-xl rounded-0 bg-white text-gray-800 border-r-gray-300 border-r-[1px] md:block dark:bg-dark-secondary dark:border-r-gray-900  ${
          isOpen
            ? "block fixed top-0 left-0 z-50 md:static md:h-auto md:max-h-none"
            : "hidden"
        }`}
      >
        <div className="flex justify-end h-4 md:hidden">
          <IconButton
            variant="text"
            color="white"
            size="sm"
            onClick={close}
            className="mr-1 mt-1"
          >
            <XMarkIcon className="h-7 w-7 stroke-1 md:hidden" />
          </IconButton>
        </div>
        <div className="flex justify-between items-center py-3 px-2">
          <div className="flex ml-[10px] dark:text-white">
            <ClipboardDocumentCheckIcon className="h-6 w-6 stroke-2 mr-1.5 mt-0.5" />
            <p className="text-lg font-bold">TaskQuarry</p>
          </div>
        </div>
        <div className="p-2">
          <List className="text-sm text-gray-800 dark:bg-dark-secondary dark:text-white">
            <NavLink to="/admin">
              <ListItem>
                <ListItemPrefix>
                  <HomeIcon className="h-5 w-5 " />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </NavLink>

            {/* <Accordion
              open={open === 1}
              darkMode={darkMode} // Pass darkMode state as prop
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                className={`p-0 ${
                  darkMode ? "bg-dark-200 text-white" : "bg-white text-gray-800"
                }`}
                selected={open === 1}
              >
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className={`border-b-0 p-3  ${
                    darkMode
                      ? "text-white hover:text-gray-800"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    variant="text"
                    className={`mr-auto text-sm ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Project Management
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody
                className={`py-1 ${
                  darkMode ? "bg-dark-200 text-white" : "bg-white text-gray-800"
                }`}
              >
                <List
                  className={`p-0 text-sm ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
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
            </Accordion> */}

            <NavLink to="/admin/projects">
              <ListItem>
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </NavLink>

            <NavLink to="/admin/users">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5 " />
                </ListItemPrefix>
                User Management
              </ListItem>
            </NavLink>

            <NavLink to="/admin/reports">
              <ListItem>
                <ListItemPrefix>
                  <FolderIcon className="h-5 w-5 " />
                </ListItemPrefix>
                Summary Reports
              </ListItem>
            </NavLink>

            <NavLink to="/admin/history">
              <ListItem>
                <ListItemPrefix>
                  <ClockIcon className="h-5 w-5 " />
                </ListItemPrefix>
                History and Logs
              </ListItem>
            </NavLink>
          </List>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
