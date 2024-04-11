// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Pages/Login";
import Userpage from "./Pages/UserPage";
import AdminPage from "./Pages/AdminPage";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { DarkModeProvider } from "./Hooks/useDarkMode";

function App() {
  const [user, setUser] = useState(null);

  return (
    <DarkModeProvider>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute user={user}>
              <Userpage user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
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
