import React from "react";
import { useAuth } from "../Hooks/useAuth";

const UserMenuBar = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>User Menu Bar</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserMenuBar;
