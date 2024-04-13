// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Pages/Login";
import Userpage from "./Pages/UserPage";
import AdminPage from "./Pages/AdminPage";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { DarkModeProvider } from "./Hooks/useDarkMode";
import Error from "./Pages/Error";

function App() {
  const [user, setUser] = useState(null);

  return (
    <DarkModeProvider>
      <Routes>
        {/* LOGIN / INDEX PAGE */}
        <Route path="/" element={<Login setUser={setUser} />} />

        <Route
          path="user/*"
          element={
            <ProtectedRoute user={user}>
              <Userpage user={user} />
            </ProtectedRoute>
          }
        />

        {/* ADMIN PROTECTED ROUTES */}
        <Route
          path="admin/*"
          element={
            <ProtectedRoute user={user}>
              <AdminPage user={user} />
            </ProtectedRoute>
          }
        />

        {/* Error Page path is asterisk */}
        <Route path="*" element={<Error />} />
      </Routes>
    </DarkModeProvider>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("/api/v1/users");
//         const {
//           data: { user },
//         } = response;
//         // setUsers(response.data.user);
//         setUsers(user);
//         console.log(response);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h2>User List</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user._id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
