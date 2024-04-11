import { useState } from "react";
import Sidebar from "../Components/Admin/Sidebar";
import Navbar from "../Components/Shared/Navbar";
import Dashboard from "./AdminPages/Dashboard";
import { useDarkMode } from "../Hooks/useDarkMode";

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
          <Dashboard />
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
