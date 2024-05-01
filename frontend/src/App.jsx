// App.jsx
import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

//Pages
import Login from "./Pages/Login";
import AdminPage from "./Pages/AdminPage";
import Userpage from "./Pages/UserPage";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Error from "./Pages/Error";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <Routes>
      {/* LOGIN / INDEX PAGE */}
      <Route path="/" element={<Login setLoggedUser={setLoggedUser} />} />

      {/* USER PROTECTED ROUTES */}
      <Route
        path="user/*"
        element={
          <ProtectedRoute loggedUser={loggedUser}>
            <Userpage loggedUser={loggedUser} />
          </ProtectedRoute>
        }
      />

      {/* ADMIN PROTECTED ROUTES */}
      <Route
        path="admin/*"
        element={
          <ProtectedRoute loggedUser={loggedUser}>
            <AdminPage loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
          </ProtectedRoute>
        }
      />

      {/* Error Page path is asterisk */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
