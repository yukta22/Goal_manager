import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [data, setData] = useState();
  const [flag, setFlag] = useState(false);
  const [formerr, setFormerr] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const err = {};
    let valflag = false;

    if (!data?.userName) {
      err.userName = "User name is required";
      valflag = true;
    }
    if (!data?.userEmail) {
      err.userEmail = "User email is required";
      valflag = true;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data?.userEmail)
    ) {
      err.userEmail = "Invalid email address";
      valflag = true;
    }

    if (!data?.userPassword) {
      err.userPassword = "User password is required";
      valflag = true;
    }

    setFormerr(err);

    return valflag;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      const res = await axios.post("http://localhost:8100/register/user", data);
      console.log(res);
      if (res.data.message == "User already exists") {
        setFlag(true);
      } else {
        navigate("/");
      }
      setData({});
    }
  };

  return (
    <>
      <Navbar />
      {flag && (
        <div className="text-red-600 text-center">
          <p className="px-5 pt-4">User is already exists</p>
        </div>
      )}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[30%] mx-auto mt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="Username"
            >
              Username
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="Username"
              name="userName"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              value={data?.userName || ""}
              // required
            />
            <div className="text-red-500 text-xs">{formerr?.userName}</div>
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              name="userEmail"
              type="text"
              placeholder="user email"
              onChange={handleChange}
              value={data?.userEmail || ""}
              // required
            />
            <div className="text-red-500 text-xs">{formerr?.userEmail}</div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              name="userPassword"
              type="password"
              onChange={handleChange}
              value={data?.userPassword || ""}
              // required
            />
            <div className="text-red-500 text-xs">{formerr?.userPassword}</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-teal-500  hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
