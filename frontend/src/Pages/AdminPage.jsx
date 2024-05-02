import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Shared Component throughout the system (always there)
import Sidebar from "../Components/Admin/Sidebar";
import Navbar from "../Components/Shared/Navbar";

// Loaded Components / Navigated Components
import Dashboard from "./AdminPages/Dashboard";
import Projects from "./AdminPages/Projects";
import Users from "./AdminPages/Users";
import Reports from "./AdminPages/Reports";
import History from "./AdminPages/History";
import SingleProject from "./AdminPages/SingleProject";
import Assigned from "./AdminPages/Assigned";
import ErrorPage from "./Error";

const AdminPage = ({ loggedUser, setLoggedUser }) => {
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
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route
              path="users"
              element={
                <Users loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
              }
            />
            <Route path="reports" element={<Reports />} />
            <Route path="history" element={<History />} />
            <Route
              path="assigned"
              element={<Assigned loggedUser={loggedUser} />}
            />

            {/* ROUTE FOR SPECIFIC PROJECT */}
            <Route path="projects/:projectID" element={<SingleProject />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>

          {/* This is where the child routes will render */}
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
