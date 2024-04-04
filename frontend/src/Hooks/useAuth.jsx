import { useState } from "react";
import { users } from "../data.js";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const login = (username, password) => {
    // Find user by username
    const user = users.find((user) => user.username === username);

    // Check password match
    if (user && user.password === password) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return { isAuthenticated, userRole, login, logout };
};
