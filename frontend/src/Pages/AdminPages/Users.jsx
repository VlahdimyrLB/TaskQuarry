import axios from "axios";
import { useState, useEffect } from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
const Users = () => {
  const [user, setUser] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/users", {
        headers: {
          Accept: "application/json",
        },
      });
      setUser(data.user);
      // console.log(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  // fetchUsers();
  useEffect(() => {
    fetchUsers();
  }, []);

  // console.log(user, "user logs");

  return (
    <Card className="w-full h-auto rounded-md">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col justify-between space-x-4 md:flex-row">
          <div>
            {/* <Typography>Users</Typography> */}
            <Button
              icon={<PlusIcon />}
              className="bg-white border border-gray-300 text-gray-800 rounded-md shadow-sm"
            >
              New User
            </Button>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Input label="Search here..." icon={<MagnifyingGlassIcon />} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="bg-white px-0">
        <table className="w-full text-left min-w-max table-auto">
          <thead>
            <tr className="border-y border-blue-gray-100 bg-blue-gray-50/50">
              <th className="p-3">Name</th>
              <th className="p-3">Username</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr className="border-y">
                <td key={user.name} className="p-3">
                  {user.name}
                </td>
                <td key={user.name} className="p-3">
                  {user.username}
                </td>
                <td className="">
                  <IconButton variant="text">
                    <TrashIcon className="h-4 w-4 text-gray-800" />
                  </IconButton>
                  <IconButton variant="text">
                    <PencilIcon className="h-4 w-4 text-gray-800" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};
export default Users;
