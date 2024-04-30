import { useState } from "react";
import useDarkMode from "../../Hooks/useDarkMode";
// import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <IconButton variant="text" size="sm" className="rounded-full mr-2">
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={20} />
    </IconButton>
  );
}
