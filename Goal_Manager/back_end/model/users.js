import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userPassword: {
    type: String,
  },
});
export const User = mongoose.model("User", userSchema);
