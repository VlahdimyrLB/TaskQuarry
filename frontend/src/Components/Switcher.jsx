import { useState } from "react";
import useDarkMode from "../Hooks/useDarkMode";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
export default function Switcher() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const [isToggled, setToggled] = useState(false);

  const handleToggleDarkMode = () => {
    setToggled(true);
    setTheme(colorTheme);
    setDarkSide(true);
    setTimeout(() => setToggled(false), 950);
  };
  return (
    <>
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
    </>
  );
}
