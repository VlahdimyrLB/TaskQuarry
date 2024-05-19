import React, { useState, useContext } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";

const Login = () => {
  const { setLoggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const handleViewPassword = () => {
    setVisible(!visible);
  };

  const [username, setUsername] = useState("Admin");
  const [password, setPassword] = useState("Admin");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/login", {
        username,
        password,
      });
      // Store the entire user object to loggedUser
      setLoggedUser(response.data.user);
      // console.log(response.data.user);
      if (response.data.isAdmin === "Admin") {
        setIsAdmin(true);
        navigate("/admin");
      } else if (response.data.isAdmin === "User") {
        navigate("/user");
      }
    } catch (error) {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-80 md:w-96 mx-auto rounded-md">
        <CardBody className="mt-3 mx-auto h-[282px]">
          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:w-80">
              <Typography className="text-center uppercase text-xl font-semibold mb-5">
                TASKQUARRY
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
                  type="button"
                  className="!absolute right-2 top-3"
                  onClick={handleViewPassword}
                >
                  {visible ? (
                    <EyeIcon className="w-5 text-[#7E94A0] hover:text-gray-900 hover:cursor-pointer" />
                  ) : (
                    <EyeSlashIcon className="w-5 text-[#7E94A0] hover:text-gray-900 hover:cursor-pointer" />
                  )}
                </button>
              </div>
              <div className="flex justify-center mt-2">
                {error && <p className="text-red-600">{error}</p>}
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full mt-5 rounded-sm hover:bg-blue-gray-800"
                >
                  LOGIN
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
