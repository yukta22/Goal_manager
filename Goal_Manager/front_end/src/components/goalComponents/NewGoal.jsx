import React, { useEffect, useState } from "react";
import GoalNavbar from "./GoalNavbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const NewGoal = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState();
  const [progress, setProgress] = useState();
  const [flag, setFlag] = useState(true);
  const [formerr, setFormerr] = useState();
  const [milestone, setMilestone] = useState([]);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (state != null) {
      setData(state);
      setProgress(state?.done);
      setMilestone(state?.milestone);
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const err = {};
    let valflag = false;
    if (!data?.subject) {
      err.subject = "subject is required";
      valflag = true;
    }
    if (!data?.description) {
      err.description = "description is required";
      valflag = true;
    }
    if (!progress) {
      err.progress = "progress is required";
      valflag = true;
    }
    setFormerr(err);

    return valflag;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      const token = localStorage.getItem("token");
      let goalData = JSON.stringify({
        subject: data?.subject,
        description: data?.description,
        done: progress,
        endDate: data?.endDate,
        completed: completed,
        milestone: JSON.stringify(milestone),
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
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      navigate("/goals");
    }
  };

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    let goalData = JSON.stringify({
      id: state._id,
      subject: data?.subject,
      description: data?.description,
      endDate: data?.endDate,
      done: progress,
      completed: completed,
      milestone: JSON.stringify(milestone),
    });

    let config = {
      method: "put",
      url: "http://localhost:8100/updateGoal",
      headers: {
        token: token,
      },
      data: JSON.parse(goalData),
    };
    // console.log(data);
    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/goals");
  };

  const handleChangeMilestone = (i, e) => {
    let newFormValues = [...milestone];
    newFormValues[i][e.target.name] = e.target.value;
    setMilestone(newFormValues);
  };

  const addFormFields = () => {
    setMilestone([...milestone, {}]);
  };

  const removeFormFields = (i) => {
    let text = "Are you Sure you want to close this?";
    if (confirm(text) == true) {
      setCompleted(completed + 1);
      let newFormValues = [...milestone];
      newFormValues.splice(i, 1);
      setMilestone(newFormValues);
    }
  };
  let curr = new Date();
  curr.setDate(curr.getDate() + 3);
  let date = curr.toISOString().substring(0, 10);

  return (
    <>
      <GoalNavbar />
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[50%] mx-auto mt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="subject"
              name="subject"
              type="text"
              onChange={handleChange}
              value={data?.subject || ""}
            />
            <div className="text-red-500 text-xs">{formerr?.subject}</div>
          </div>
          <div className="w-full px-3 mt-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              name="description"
              type="text"
              value={data?.description || ""}
              onChange={handleChange}
            />
            <div className="text-red-500 text-xs">{formerr?.description}</div>
          </div>
          <div className="w-full px-3 mt-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              %Done
            </label>
            <select
              className="w-full py-2 ps-2"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="0">0%</option>
              <option value="10">10%</option>
              <option value="20">20%</option>
              <option value="30">30%</option>
              <option value="40">40%</option>
              <option value="50">50%</option>
              <option value="60">60%</option>
              <option value="70">70%</option>
              <option value="80">80%</option>
              <option value="90">90%</option>
              <option value="100">100%</option>
            </select>
          </div>
          <div className="text-red-500 text-xs ">{formerr?.progress}</div>
          <div className="ps-2 pe-2 mt-5 mx-2 w-full">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              className="w-full appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              // value={element.startDate || ""}
              defaultValue={date}
              disabled
              // onChange={handleChange}
            />
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              // min={date}
              onChange={handleChange}
              value={data?.endDate || ""}
            />
          </div>
        </div>

        {milestone.map((element, index) => (
          <div className="" key={index}>
            <h1 className="my-3 text-lg text-teal-600">
              Milestone {index + 1}
            </h1>
            <label>Name</label>
            <input
              type="text"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="name"
              value={element.name || ""}
              onChange={(e) => handleChangeMilestone(index, e)}
            />
            <label>Description</label>
            <input
              type="text"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="description"
              value={element.description || ""}
              onChange={(e) => handleChangeMilestone(index, e)}
            />

            {index >= 0 ? (
              <button
                type="button"
                className="bg-red-500 my-4 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => removeFormFields(index)}
              >
                Completed
              </button>
            ) : null}
          </div>
        ))}
        <button
          className="bg-teal-500 my-4 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => addFormFields()}
        >
          Add Milestone
        </button>
        <div className="flex items-center justify-between">
          {flag ? (
            <button
              className="bg-teal-500  hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-teal-500  hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default NewGoal;
