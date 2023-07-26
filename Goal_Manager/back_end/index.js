import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRoute } from "./routes/user.routes.js";
import { goalRoute } from "./routes/goals.routes.js";
import { verifyJwt } from "./middleware/verifyJwt.js";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/GoalManager")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.use(express.json());
app.use(cors());

app.use("/", userRoute);
app.use(verifyJwt);
app.use("/", goalRoute);
app.listen(8100, () => {
  console.log(`Server running on port 8100`);
});
