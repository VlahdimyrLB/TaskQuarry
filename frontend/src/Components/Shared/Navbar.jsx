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
} from "@material-tailwind/react";
import {
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useState, createElement } from "react";
import { useDarkMode } from "../../Hooks/useDarkMode";

import userIcon from "../../Assets/images/icon.jpg";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const Navbar = ({ toggleSidebar, loggedUser }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isToggled, setToggled] = useState(false);

  const handleToggleDarkMode = () => {
    setToggled(true);
    toggleDarkMode();
    setTimeout(() => setToggled(false), 950);
  };

  // HANDLES MENU STATE OF PROFILE
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 left-0 right-0">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div
          className={`flex items-center justify-between h-14  pr-4 ${
            darkMode
              ? "bg-dark-200 text-white border-b border-gray-900"
              : "bg-white text-gray-800 border-b border-gray-300"
          }`}
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
            <h1 className="font-bold ml-2.5 text-sm md:ml-0">
              TaskQuarry Icon Here
            </h1>
          </div>

          <div className="flex justify-center items-center">
            <Typography className="mr-4 text-[16px]">
              Good Day! {loggedUser.name}
            </Typography>
            <IconButton
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
            </IconButton>
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
                    alt="kim chaewon"
                    className="border border-gray-800 h-10 w-10 hover:opacity-80"
                    src={userIcon}
                  />
                </button>
              </MenuHandler>
              <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon }, key) => {
                  return (
                    <MenuItem
                      key={key}
                      className="flex items-center gap-2 rounded text-gray-700"
                    >
                      {createElement(icon, {
                        className: `h-4 w-4`,
                        strokeWidth: 2,
                      })}
                      <Typography as="span" variant="small">
                        {label}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
