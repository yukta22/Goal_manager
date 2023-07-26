import express from "express";
import { createUser, getUser } from "../controllers/user.controllers.js";

export const userRoute = express.Router();

userRoute.post("/register/user", createUser);
userRoute.post("/login/user", getUser);
