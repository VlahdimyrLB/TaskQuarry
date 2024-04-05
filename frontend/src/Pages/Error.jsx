import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>ERROR: 404 Page Not Found</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Error;
