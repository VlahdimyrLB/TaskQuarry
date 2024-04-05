import { Navigate } from "react-router-dom";

// Theres two props children/or the component inside the protected route and the user from login
const ProtectedRoute = ({ children, user }) => {
  // If theres no user go back to homepage
  if (!user) {
    return <Navigate to="/" />;
  }

  // If there's a user then return the Childen which is Dashboard
  return children;
};
export default ProtectedRoute;
