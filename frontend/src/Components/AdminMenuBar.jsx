import React from "react";
import { useAuth } from "../Hooks/useAuth";

const AdminMenuBar = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Admin Menu Bar</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminMenuBar;
