import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-96 mx-auto md:mb-44 rounded-md">
        {/* <CardHeader className="mb-4 grid h-20 place-items-center shadow-md">
          Login
        </CardHeader> */}
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
                className=""
              />
            </div>
            <div className="relative mb-4">
              {/* <button className="absolute">
                <EyeIcon />
              </button> */}
              <Input
                variant="standard"
                type="password"
                name="password"
                label="Password"
                className=""
                icon={<EyeIcon />}
              />
            </div>
            <div>
              <Button className="w-full mt-3 rounded-sm hover:bg-blue-gray-800">
                Login``
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
