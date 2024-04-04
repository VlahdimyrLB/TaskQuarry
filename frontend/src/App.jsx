// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import UserMenuBar from "./Components/UserMenuBar";
import AdminMenuBar from "./Components/AdminMenuBar";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route
          path="/user/*"
          element={
            <PrivateRoute element={<UserMenuBar />} requiredRole="user" />
          }
        />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute element={<AdminMenuBar />} requiredRole="admin" />
          }
        /> */}
        {/* Add other routes */}
      </Routes>
    </Router>
  );
}

export default App;
