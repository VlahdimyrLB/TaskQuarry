import { Navigate } from "react-router-dom";

// Theres two props children/or the component inside the protected route and the user from login
const ProtectedRoute = ({ children, loggedUser }) => {
  // If theres no logged user go back to homepage
  if (!loggedUser) {
    return <Navigate to="/" />;
  }

  // If there's a user then return the Childen which is admin or user page
  return children;
};
export default ProtectedRoute;
