import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Shared Component throughout the system (always there)
import Sidebar from "../Components/User/Sidebar";
import Navbar from "../Components/Shared/Navbar";

// Loaded Components / Navigated Components
import Dashboard from "./UserPages/Dashboard";
import Assigned from "./UserPages/Assigned";
import ErrorPage from "./Error";

const UserPage = ({ loggedUser, setLoggedUser }) => {
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
        <Navbar
          toggleSidebar={toggleSidebar}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
        />
        {/* MAIN CONTENT SECTION */}
        <section className="h-screen text-dark p-5 overflow-auto bg-gray-100 dark:bg-dark-primary">
          {/* Nested Routes */}
          <Routes>
            <Route index element={<Dashboard loggedUser={loggedUser} />} />
            <Route
              path="assigned"
              element={<Assigned loggedUser={loggedUser} />}
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>

          {/* This is where the child routes will render */}
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default UserPage;
