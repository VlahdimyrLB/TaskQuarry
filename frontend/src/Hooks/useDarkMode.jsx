import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    if (localStorage.theme == "dark") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
