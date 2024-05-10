import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto text-center h-screen">
      <div className="text-4xl">
        <strong>ERROR: 404</strong>
      </div>
      <di className="text-2xl">Page Not Found</di>
      <Link to="/">
        <button className=" mt-5 px-2 py-2 bg-blue-gray-900 text-white hover:opacity-70 rounded-md transition-all">
          Back to Login
        </button>
      </Link>
    </div>
  );
};

export default Error;
