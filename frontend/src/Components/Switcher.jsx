import { useState } from "react";
import useDarkMode from "../Hooks/useDarkMode";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@material-tailwind/react";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkMode();
  const [isDarkMode, setDarkMode] = useState(colorTheme === "light");
  const [isToggled, setToggled] = useState(false);

  const handleToggleDarkMode = () => {
    setToggled(true);
    setDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "dark" : "light");
    setTimeout(() => {
      setToggled(false);
    }, 970);
  };

  return (
    <IconButton
      variant="text"
      size="small"
      onClick={handleToggleDarkMode}
      className={`rounded-full mr-2 ${isToggled ? "animate-spin" : ""}`}
    >
      {isDarkMode ? (
        <MoonIcon className="h-5 w-5 text-gray-900" />
      ) : (
        <SunIcon className="h-5 w-5 text-white" />
      )}
    </IconButton>
  );
}
