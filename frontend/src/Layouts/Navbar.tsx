import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-12 bg-yellow-100">
      <div className="flex justify-end items-center gap-2">
        <Link to="/"></Link>
        <Link to="/home">Home</Link>
        <Link to="/compare">Compare CVs</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        {/* <Link to="/interview/:id">Report</Link> */}
      </div>
    </div>
  );
};

export default Navbar;
