import React from "react";
import { Link } from "react-router-dom";

const GoalNavbar = () => {
  return (
    <nav className="flex items-center flex-wrap justify-between  bg-teal-500 p-6 w-[100vw]">
      <div className="flex items-center  text-white mr-6">
        <Link to="/goals">
          <span className="font-semibold text-xl tracking-tight">
            Goal Manager
          </span>
        </Link>
      </div>

      <div className="">
        <Link
          to="/newGoal"
          className="inline-block mx-2 text-sm px-4 py-2  border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white "
        >
          Create New Goal
        </Link>
        <Link
          to="/"
          className="inline-block mx-2 text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white  "
        >
          Log out
        </Link>
      </div>
    </nav>
  );
};

export default GoalNavbar;
