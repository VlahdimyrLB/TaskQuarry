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
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, close }) => {
  const location = useLocation();

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
          <div className="flex ml-[10px] dark:text-[#E6EDF3]">
            <ClipboardDocumentCheckIcon className="h-6 w-6 stroke-2 mr-1.5 mt-0.5" />
            <p className="text-lg font-bold">TaskQuarry</p>
          </div>
        </div>
        <div className="p-2">
          <List className="text-sm text-gray-800 dark:bg-dark-secondary dark:text-[#E6EDF3]">
            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 dark:bg-blue-gray-50 dark:text-blue-gray-900 dark:opacity-80 rounded"
                  : ""
              }
              end
            >
              <ListItem>
                <ListItemPrefix>
                  <HomeIcon className="h-5 w-5 " />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </NavLink>

            <NavLink
              to="/user/assigned"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 dark:bg-blue-gray-50 dark:text-blue-gray-900 dark:opacity-80 rounded"
                  : ""
              }
              end
            >
              <ListItem>
                <ListItemPrefix>
                  <BriefcaseIcon className="h-5 w-5 " />
                </ListItemPrefix>
                Assigned Work
              </ListItem>
            </NavLink>

            {/* <NavLink
              to="/admin/projects"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 dark:bg-blue-gray-50 dark:text-blue-gray-900 dark:opacity-80 rounded"
                  : ""
              }
              end
            >
              <ListItem>
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 dark:bg-blue-gray-50 dark:text-blue-gray-900 dark:opacity-80 rounded"
                  : ""
              }
              end
            >
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5 " />
                </ListItemPrefix>
                User Management
              </ListItem>
            </NavLink>

            <NavLink
              to="/admin/reports"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 dark:bg-blue-gray-50 dark:text-blue-gray-900 dark:opacity-80 rounded"
                  : ""
              }
              end
            >
              <ListItem>
                <ListItemPrefix>
                  <FolderIcon className="h-5 w-5 " />
                </ListItemPrefix>
                Summary Reports
              </ListItem>
            </NavLink>

            <NavLink
              to="/admin/history"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 dark:bg-blue-gray-50 dark:text-blue-gray-900 dark:opacity-80 rounded"
                  : ""
              }
              end
            >
              <ListItem>
                <ListItemPrefix>
                  <ClockIcon className="h-5 w-5 " />
                </ListItemPrefix>
                History and Logs
              </ListItem>
            </NavLink> */}
          </List>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
