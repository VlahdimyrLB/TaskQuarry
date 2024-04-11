import React, { createContext, useState, useContext, useEffect } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const localStorageTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(
    localStorageTheme === "dark" ? true : false
  );

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
// import { useState, useEffect } from "react";

// export default function useDarkMode() {
//   const [theme, setTheme] = useState(localStorage.theme);
//   const colorTheme = theme === "dark" ? "light" : "dark";
//   localStorage.setItem("theme", theme);
//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove(colorTheme);
//     root.classList.add(theme);
//     if (localStorage.theme == "dark") localStorage.removeItem("theme");
//     else localStorage.setItem("theme", theme);
//   }, [theme, colorTheme]);

//   return [colorTheme, setTheme];
// }
