import express from "express";
import {
  createGoal,
  deleteGoal,
  getGoal,
  updateGoal,
} from "../controllers/goals.controllers.js";

export const goalRoute = express.Router();

goalRoute.post("/createGoal", createGoal);
goalRoute.get("/getGoal", getGoal);
goalRoute.put("/updateGoal", updateGoal);
goalRoute.delete("/deleteGoal/:id", deleteGoal);
