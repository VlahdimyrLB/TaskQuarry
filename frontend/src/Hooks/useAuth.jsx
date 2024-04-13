import { useState } from "react";

// Sample data array (mocking database)
const users = [
  { username: "admin", password: "admin", userType: "admin" },
  { username: "user", password: "user", userType: "user" },
];

const useAuth = () => {
  const [user, setUsername] = useState(null);
  const [error, setError] = useState(null);

  const login = (username, password) => {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      setUsername(foundUser);
      setError(null);
    } else {
      setError("Invalid username or password");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return { user, error, login, logout };
};

export default useAuth;
