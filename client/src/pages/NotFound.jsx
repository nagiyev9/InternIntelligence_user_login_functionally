import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-12">
        <h1 className="text-3xl">PAGE NOT FOUND</h1>
        <div className="flex gap-4">
            <Link to="/login" className="bg-blue-500 rounded-md px-4 py-2 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-500 transition-all">Login</Link>
            <Link to="/signup" className="bg-blue-500 rounded-md px-4 py-2 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-500 transition-all">Signup</Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
