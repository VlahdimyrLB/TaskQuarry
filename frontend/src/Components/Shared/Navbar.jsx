import {
  Avatar,
  Button,
  ChevronDownIcon,
  Menu,
  MenuItem,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useState, createElement } from "react";
import userIcon from "../../Assets/icon.jpg";

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

const Navbar = ({ toggleSidebar }) => {
  // HANDLES MENU STATE OF PROFILE
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 left-0 right-0">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-12 bg-white border-b border-gray-200">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <p className="font-bold text-gray-800 ml-2.5">Dashboard</p>
          </div>
          <div className="flex space-x-2">
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              placement="bottom-end"
            >
              <MenuHandler>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                  {/* CAUSES ERROR ELEMENT TYPE NOT VALID:
                   <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3 w-3  ${isMenuOpen ? "rotate-180" : ""}`}
                  /> */}
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt="kim chaewon"
                    className="border border-gray-800 p-[0.75px] mr-2"
                    src={userIcon}
                  />
                </Button>
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
