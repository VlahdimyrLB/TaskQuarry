import { useState } from "react";
import Sidebar from "../Components/Admin/Sidebar";
import Navbar from "../Components/Shared/Navbar";
import Dashboard from "./AdminPages/Dashboard";
import { useDarkMode } from "../Hooks/useDarkMode";
import { Routes, Route, Outlet } from "react-router-dom";
import Users from "./AdminPages/Users";

const AdminPage = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const { darkMode } = useDarkMode();

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} close={handleCloseSidebar} />
      <div className="flex flex-col w-full">
        <Navbar toggleSidebar={toggleSidebar} />
        {/* MAIN CONTENT SECTION */}
        <section
          className={`h-screen text-white p-5 overflow-auto ${
            darkMode ? "bg-dark-200" : ""
          }`}
        >
          {/* Nested Routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="users" element={<Users />} />{" "}
            {/* Add the route for SettingsPage */}
          </Routes>
          <Outlet /> {/* This is where the child routes will render */}
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
