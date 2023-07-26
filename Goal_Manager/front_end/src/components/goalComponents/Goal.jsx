import React, { useEffect, useState } from "react";
import GoalNavbar from "./GoalNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";

const Goal = () => {
  const [data, setData] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [deleteflag, setDeleteflag] = useState(false);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8100/getGoal", {
        headers: { token: token, pageNo: pageNo },
      })
      .then((response) => {
        setData(response.data);
      });
  }, [deleteflag, pageNo, flag]);
  console.log(data);
  const handleEdit = (ele) => {
    navigate("/newGoal", { state: ele });
  };

  const handleDelete = async (id) => {
    let text = "Are you Sure you want to delete this?";
    if (confirm(text) == true) {
      setDeleteflag(true);

      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8100/deleteGoal/${id}`, {
        headers: {
          token: token,
        },
      });
      setDeleteflag(false);
      navigate("/goals");
    } else {
      text = "You canceled!";
    }
  };
  const handleCopy = async (ele) => {
    setFlag(true);
    const token = localStorage.getItem("token");
    // copy(JSON.stringify(ele));
    console.log(ele);
    let goalData = JSON.stringify({
      subject: ele?.subject + " (copy)",
      description: ele?.description,
      done: ele.done,
      endDate: ele?.endDate,
      completed: ele.completed,
      milestone: JSON.stringify(ele.milestone),
    });

    let config = {
      method: "post",
      url: "http://localhost:8100/createGoal",
      headers: {
        token: token,
      },
      data: JSON.parse(goalData),
    };
    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    // setFlag(false);
    navigate("/goals");
  };

  const prevPage = () => {
    if (pageNo <= 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };
  const nextPage = () => {
    if (data?.length > 1) {
      setPageNo(pageNo + 1);
    }
  };
  const count = (word) => {
    let split = word.split(" ");
    console.log(split);
    let ans = "";
    let count = 0;
    for (const element of split) {
      console.log(element);
      if (element == "(copy)") {
        count = count + 1;
      } else {
        ans = element;
      }
    }
    return `${ans} (copy ${count}) `;
  };
  return (
    <>
      <GoalNavbar />
      <div className="text-5xl text-center">My Goals</div>
      {data?.map((ele) => {
        return (
          <div
            className="sm:m-0 sm:my-2 md:mx-20 md:my-5 lg:mx-20 lg:my-5"
            key={crypto.randomUUID()}
          >
            <div className="border border-2 my-1 sm:mx-7 md:mx-10 lg:mx-52 p-10">
              <div className="text-xl ">Goal Name</div>
              <p className="pt-1">
                {ele.subject.includes("(copy)")
                  ? count(ele.subject)
                  : ele.subject}
              </p>
              <div className="text-xl pt-4">Details</div>
              <p className="pt-1">{ele.description}</p>
              <div className="text-xl pt-4">Progress</div>

              <div className="w-full mt-4 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-green-400 text-xs font-bold text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${ele.done}%` }}
                >
                  {ele.done}%
                </div>
              </div>
              <div className="flex pt-4">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => handleEdit(ele)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => handleDelete(ele._id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => handleCopy(ele)}
                >
                  copy
                </button>
              </div>
              <div className="text-red-600">{ele.status}</div>
            </div>
          </div>
        );
      })}
      {/* {data?.length > 0 && ( */}
      {/* <div className="flex justify-center pb-4">
        <button
          type="button"
          className="bg-blue-800 m-2 text-white px-3 rounded"
          onClick={prevPage}
        >
          Prev
        </button>
        <div className="m-2 my-3">{pageNo}</div>
        <button
          type="button"
          className="bg-blue-800 m-2 text-white px-3 rounded"
          onClick={nextPage}
        >
          Next
        </button>
      </div> */}
      {/* )} */}
    </>
  );
};

export default Goal;
