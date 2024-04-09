import { useState } from "react";
import Sidebar from "../Components/Admin/Sidebar";
import Navbar from "../Components/Shared/Navbar";
import Dashboard from "./AdminPages/Dashboard";

const AdminPage = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} close={handleCloseSidebar} />
      <div className="flex flex-col w-full">
        <Navbar toggleSidebar={toggleSidebar} />
        {/* MAIN CONTENT SECTION */}
        <section className="bg-gray-100 h-screen text-white p-5">
          <Dashboard />
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
