import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { users } from "../data";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleViewPassword = () => {
    setVisible(!visible);
  };

  const handleLogin = () => {
    // Validate username and password
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    console.log(user);

    if (user.role === "user") {
      setIsAuthenticated(true);
      setUser({ username: username, password: password });
      navigate("/user");
    } else if (user.role === "admin") {
      setIsAuthenticated(true);
      setUser({ username: username, password: password });
      navigate("/admin");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-96 mx-auto rounded-md">
        <CardBody className="mt-4 mx-auto h-[300px]">
          <div className="flex flex-col w-80">
            <Typography className="text-center uppercase text-lg font-semibold mb-2">
              Login
            </Typography>
            <div className="mb-6">
              <Input
                variant="standard"
                id="username"
                name="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                variant="standard"
                type={visible ? "text" : "password"} // Toggle password visibility
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-20"
              />
              <button
                className="!absolute right-2 top-3"
                onClick={handleViewPassword}
              >
                {visible ? (
                  <EyeIcon className="w-5 text-gray-700 hover:text-gray-900 hover:cursor-pointer" />
                ) : (
                  <EyeSlashIcon className="w-5 text-gray-700 hover:text-gray-900 hover:cursor-pointer" />
                )}
              </button>
            </div>
            <div>
              <Button
                className="w-full mt-5 rounded-sm hover:bg-blue-gray-800"
                onClick={handleLogin} //  Handle login button click
              >
                LOG IN
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
