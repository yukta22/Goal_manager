import { Goal } from "../model/goals.js";

const createGoal = async (req, res) => {
  try {
    const data = req.body;
    const finduser = req?.user;
    let status;
    let len = JSON.parse(data.milestone).length;
    if (data.done == "100" && len == 0) {
      status = "Completed";
    } else if (data.endDate > Date.now()) {
      status = "late";
    } else {
      status = "In-progress";
    }
    const goal = new Goal({
      subject: data.subject,
      description: data.description,
      done: data.done,
      user: finduser.findData._id,
      status: status,
      endDate: data.endDate,
      milestone: JSON.parse(data.milestone),
    });
    const saveGoal = await goal.save();
    res.status(201).json(saveGoal);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getGoal = async (req, res) => {
  try {
    const finduser = req?.user;
    // const pageno = req.headers.pageno;
    // console.log(finduser);
    // const skipData = 2;
    const goal = await Goal.find({
      user: finduser.findData._id,
      deleted: false,
    }).sort({ subject: 1 });
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateGoal = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);
    const finduser = req?.user;
    let status;
    let len = JSON.parse(data.milestone).length;

    if (data.done == "100" && len == 0) {
      status = "Completed";
    } else if (
      new Date(data.endDate).getTime() < new Date(Date.now()).getTime()
    ) {
      console.log("asdas");
      status = "late";
    } else {
      status = "In-progress";
    }
    const goal = await Goal.findByIdAndUpdate(req.body.id, {
      subject: data.subject,
      description: data.description,
      done: data.done,
      endDate: data.endDate,
      user: finduser.findData._id,
      status: status,
      milestone: JSON.parse(data.milestone),
    });
    res.status(200).json(goal);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteGoal = async (req, res) => {
  try {
    // console.log(req.params.id);
    const goal = await Goal.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).json(goal);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export { createGoal, getGoal, updateGoal, deleteGoal };
