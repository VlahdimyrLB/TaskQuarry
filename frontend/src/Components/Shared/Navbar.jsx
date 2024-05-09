import {
  Avatar,
  Button,
  ChevronDownIcon,
  IconButton,
  Menu,
  MenuItem,
  MenuHandler,
  MenuList,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

import {
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useState, useContext } from "react";
import Switcher from "./Switcher";
import userIcon from "../../Assets/images/user.png";
import TQ from "../../Assets/images/TQ.png";
import { AuthContext } from "../../App";

import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = ({ toggleSidebar }) => {
  const { loggedUser, setLoggedUser } = useContext(AuthContext);
  // HANDLES MENU STATE OF PROFILE
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate(); // Use useNavigate hook

  const handleSignOut = () => {
    setLoggedUser(null);
    navigate("/");
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <nav className="sticky top-0 left-0 right-0">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div
          className="flex items-center justify-between h-14 pr-4 bg-white border-b-gray-3 00 border-b-[1px]
         dark:bg-dark-secondary dark:border-b-gray-900 dark:text-[#E6EDF3]"
        >
          <div className="flex items-center px-4">
            {/* HAMBURGER TOGGLE */}
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:text-gray-700 cursor-pointer md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="font-bold ml-2.5 text-lg text-gray-800 md:ml-0">
              {/* <Avatar src={TQ} className="w-9 h-9" /> */}
              TaskQuarry
            </h1>
          </div>

          <div className="flex justify-center items-center">
            <Typography className="mr-4 text-[16px] hidden md:block">
              Good Day! {loggedUser.name}
            </Typography>
            {/* <Switcher /> */}
            {/* <IconButton
              variant="text"
              size="sm"
              onClick={handleToggleDarkMode}
              className={`rounded-full mr-2 ${isToggled ? "animate-spin" : ""}`}
            >
              {darkMode ? (
                <MoonIcon className="h-5 w-5 text-white" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </IconButton> */}
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              placement="bottom-end"
            >
              <MenuHandler>
                <button
                  // variant="text"
                  // color="blue-gray"
                  className="flex items-center rounded-full "
                >
                  {/* CAUSES ERROR ELEMENT TYPE NOT VALID:
                   <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3 w-3  ${isMenuOpen ? "rotate-180" : ""}`}
                  /> */}
                  <Avatar
                    variant="circular"
                    // size="md"
                    alt="User"
                    className="h-10 w-10 hover:opacity-80"
                    src={userIcon}
                  />
                </button>
              </MenuHandler>
              <MenuList className="p-1">
                {/* <MenuItem
                  onClick={handleOpen}
                  className="flex items-center gap-2 rounded text-gray-700"
                >
                  <UserCircleIcon className="h-4 w-4" strokeWidth={2} />
                  <Typography as="span" variant="small">
                    My Profile
                  </Typography>
                </MenuItem> */}

                <MenuItem
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded text-gray-700"
                >
                  <PowerIcon className="h-4 w-4" strokeWidth={2} />
                  <Typography as="span" variant="small">
                    Sign Out
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>

      {/* <Dialog open={open} handler={handleOpen}>
        <DialogHeader>My Profile</DialogHeader>
        <DialogBody>
          <Input
            label="Enter Full Name"
            variant="standard"
            size="md"
            name="name"
            // value={toUpdateUser.name}
            // onChange={handleChangeUpdate}
            // error={isNameDuplicate ? true : false}
            // className={isNameDuplicate ? "text-red-500" : ""}
          />
          <Input
            label="Enter Username"
            variant="standard"
            size="md"
            name="username"
            // value={toUpdateUser.username}
            // onChange={handleChangeUpdate}
            // error={isUsernameDuplicate ? true : false}
            // className={isUsernameDuplicate ? "text-red-500" : ""}
          />
          <Input
            label="Enter Password"
            variant="standard"
            size="md"
            name="password"
            // value={toUpdateUser.password}
            // onChange={handleChangeUpdate}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
    </nav>
  );
};
export default Navbar;
