// import axios from "axios";

// import {
//   MagnifyingGlassIcon,
//   ChevronUpDownIcon,
// } from "@heroicons/react/24/outline";
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
// import {
//   Card,
//   CardHeader,
//   Input,
//   Typography,
//   Button,
//   CardBody,
//   Chip,
//   CardFooter,
//   Tabs,
//   TabsHeader,
//   Tab,
//   Avatar,
//   IconButton,
//   Tooltip,
// } from "@material-tailwind/react";
// import { useEffect, useState } from "react";

// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Admin",
//     value: "admin",
//   },
//   {
//     label: "User",
//     value: "User",
//   },
// ];

// const TABLE_HEAD = ["Name", "Username", "Password", "Type", ""];

// const TABLE_ROWS = [
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
//     name: "John Michael",
//     email: "john@creative-tim.com",
//     job: "Manager",
//     org: "Organization",
//     online: true,
//     date: "23/04/18",
//   },
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
//     name: "Alexa Liras",
//     email: "alexa@creative-tim.com",
//     job: "Programator",
//     org: "Developer",
//     online: false,
//     date: "23/04/18",
//   },
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
//     name: "Laurent Perrier",
//     email: "laurent@creative-tim.com",
//     job: "Executive",
//     org: "Projects",
//     online: false,
//     date: "19/09/17",
//   },
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
//     name: "Michael Levi",
//     email: "michael@creative-tim.com",
//     job: "Programator",
//     org: "Developer",
//     online: true,
//     date: "24/12/08",
//   },
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
//     name: "Richard Gran",
//     email: "richard@creative-tim.com",
//     job: "Manager",
//     org: "Executive",
//     online: false,
//     date: "04/10/21",
//   },
// ];

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [isNameDuplicate, setIsNameDuplicate] = useState(false);
//   const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);
//   const [toUpdateUser, setToUpdateUser] = useState({
//     name: "",
//     username: "",
//     password: "",
//     isAdmin: false,
//   });

//   const [newUser, setNewUser] = useState({
//     name: "",
//     username: "",
//     password: "",
//     isAdmin: false,
//   });

//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/users", {
//         headers: {
//           Accept: "application/json",
//         },
//       });
//       setUsers(data.user);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//     // Reset duplicate indicators when user updates the input
//     setIsNameDuplicate(false);
//     setIsUsernameDuplicate(false);
//   };

//   // CREATE
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if the new user's name or username already exists
//       const existingNameUser = users.find((user) => user.name === newUser.name);
//       const existingUsernameUser = users.find(
//         (user) => user.username === newUser.username
//       );

//       if (existingNameUser) {
//         setIsNameDuplicate(true);
//         return;
//       }

//       if (existingUsernameUser) {
//         setIsUsernameDuplicate(true);
//         return;
//       }

//       // If no duplicate user is found, proceed with creating the new user
//       await axios.post("/api/v1/users", newUser, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       fetchUsers(); // Pang refresh ito
//       setNewUser({
//         // Clear form
//         name: "",
//         username: "",
//         password: "",
//         isAdmin: false,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // UPDATE
//   const handleUpdate = async (userId) => {
//     try {
//       const updatedUser = users.find((user) => user._id === userId);
//       await axios.patch(`/api/v1/users/${userId}`, updatedUser, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       fetchUsers(); // Pang refresh ito
//     } catch (error) {
//       console.log("Error updating user:", error);
//     }
//   };

//   // DELETE
//   const handleDelete = async (userId) => {
//     try {
//       const confirmed = window.confirm(
//         "Are you sure you want to delete this user?"
//       );
//       if (confirmed) {
//         await axios.delete(`/api/v1/users/${userId}`);
//         fetchUsers(); // Pang refresh ito
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //OPEN CREATE NEW USER DIALOG
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   //OPEN UPDATE USER DIALOG added id in params to get the clciked user
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const handleOpenUpdate = (id) => {
//     setOpenUpdate(!openUpdate);
//     const userToUpdate = users.find((user) => user._id === id);
//     console.log("User:", userToUpdate);
//     setToUpdateUser(userToUpdate);
//   };
//   return (
//     <Card className="w-full dark:bg-dark-secondary dark:text-[#E6EDF3] dark:shadow-white dark:shadow-sm">
//       <CardHeader
//         floated={false}
//         shadow={false}
//         className="rounded-none dark:bg-dark-secondary dark:text-[#E6EDF3] dark:shadow-white dark:shadow-sm"
//       >
//         <div className="mb-8 flex items-center justify-between gap-8">
//           <div>
//             <Typography variant="h5" color="blue-gray">
//               Users list
//             </Typography>
//             <Typography color="gray" className="mt-1 font-normal">
//               See information about all users
//             </Typography>
//           </div>
//           <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
//             <Button className="flex items-center gap-3" size="sm">
//               <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create New
//               User
//             </Button>
//           </div>
//         </div>
//         <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//           <Tabs value="all" className="w-full md:w-max">
//             <TabsHeader>
//               {TABS.map(({ label, value }) => (
//                 <Tab key={value} value={value}>
//                   &nbsp;&nbsp;{label}&nbsp;&nbsp;
//                 </Tab>
//               ))}
//             </TabsHeader>
//           </Tabs>
//           <div className="w-full md:w-72">
//             <Input
//               label="Search"
//               icon={<MagnifyingGlassIcon className="h-5 w-5" />}
//             />
//           </div>
//         </div>
//       </CardHeader>

//       <CardBody className="overflow-scroll px-0">
//         <table className="mt-4 w-full min-w-max table-auto text-left">
//           <thead>
//             <tr>
//               {TABLE_HEAD.map((head, index) => (
//                 <th
//                   key={head}
//                   className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
//                 >
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
//                   >
//                     {head}{" "}
//                     {index !== TABLE_HEAD.length - 1 && (
//                       <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
//                     )}
//                   </Typography>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => {
//               const isLast = index === TABLE_ROWS.length - 1;
//               const classes = isLast
//                 ? "p-4"
//                 : "p-4 border-b border-blue-gray-50";

//               return (
//                 <tr key={user._id}>
//                   <td className={classes}>
//                     <div className="flex items-center gap-3">
//                       {/* <Avatar src={img} alt={user.name} size="sm" /> */}
//                       <div className="flex flex-col">
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal"
//                         >
//                           {user.name}
//                         </Typography>
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal opacity-70"
//                         >
//                           {user.isAdmin ? "Admin" : "User"}
//                         </Typography>
//                       </div>
//                     </div>
//                   </td>

//                   <td className={classes}>
//                     <div className="flex flex-col">
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal"
//                       >
//                         {user.username}
//                       </Typography>
//                     </div>
//                   </td>

//                   <td className={classes}>
//                     <div className="flex flex-col">
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal"
//                       >
//                         {user.password}
//                       </Typography>
//                     </div>
//                   </td>

//                   <td className={classes}>
//                     <div className="w-max">
//                       <Chip
//                         variant="ghost"
//                         size="sm"
//                         value={user.isAdmin ? "Admin" : "User"}
//                         color={user.isAdmin ? "green" : "blue-gray"}
//                       />
//                     </div>
//                   </td>

//                   <td className={classes}>
//                     <Tooltip content="Edit User">
//                       <IconButton variant="text">
//                         <PencilIcon className="h-4 w-4" />
//                       </IconButton>
//                     </Tooltip>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </CardBody>
//       <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//         <Typography variant="small" color="blue-gray" className="font-normal">
//           Page 1 of 10
//         </Typography>
//         <div className="flex gap-2">
//           <Button variant="outlined" size="sm">
//             Previous
//           </Button>
//           <Button variant="outlined" size="sm">
//             Next
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Users;
