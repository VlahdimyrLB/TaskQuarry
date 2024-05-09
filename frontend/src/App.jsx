// App.jsx
import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

//Pages
import Login from "./Pages/Login";
import AdminPage from "./Pages/AdminPage";
import Userpage from "./Pages/UserPage";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Error from "./Pages/Error";

export const AuthContext = createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      <Routes>
        {/* LOGIN / INDEX PAGE */}
        <Route path="/" element={<Login />} />

        {/* USER PROTECTED ROUTE */}
        <Route
          path="user/*"
          element={
            <ProtectedRoute>
              <Userpage />
            </ProtectedRoute>
          }
        />

        {/* ADMIN PROTECTED ROUTE */}
        <Route
          path="admin/*"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Error Page path is asterisk */}
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
