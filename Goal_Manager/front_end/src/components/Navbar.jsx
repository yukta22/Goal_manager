import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center flex-wrap justify-between  bg-teal-500 p-6 w-[100vw]">
      <div className="flex items-center  text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Goal Manager
        </span>
      </div>

      <div className="">
        <Link
          to="/"
          className="inline-block mx-2 text-sm px-4 py-2  border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white "
        >
          Login
        </Link>
        <Link
          to="/signUp"
          className="inline-block mx-2 text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white  "
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
