import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [flag, setFlag] = useState(false);
  const [formerr, setFormerr] = useState();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const err = {};
    let valflag = false;

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
      err.userPassword = "User email is required";
      valflag = true;
    }

    setFormerr(err);

    return valflag;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) {
      postRequest();
    }
  };

  const postRequest = async () => {
    const login = await axios.post("http://localhost:8100/login/user", data);
    console.log(login);
    if (login.data.findData === undefined) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("token", login.data.token);
      navigate("/goals");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-[40%] mx-auto mt-10 max-w-xs">
        {flag && (
          <div
            className="text-white mx-5 mt-3 "
            style={{ backgroundColor: "#FF7F50" }}
          >
            <p className="px-5 py-3 ">
              Sorry, we can't find an account with this email address. Please
              try again{" "}
              <Link
                className="text-decoration-none text-white text-decoration-underline underline"
                to="/signUp"
              >
                Create a new account
              </Link>
            </p>
          </div>
        )}
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Email"
              type="email"
              placeholder="Email"
              name="userEmail"
              onChange={handleChange}
              // required
            />
            <div className="text-red-500 text-xs">{formerr?.userEmail}</div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="password"
              name="userPassword"
              onChange={handleChange}
              // required
            />
            <div className="text-red-500 text-xs">{formerr?.userPassword}</div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-500  hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
