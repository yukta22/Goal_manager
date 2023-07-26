import mongoose from "mongoose";
const goalSchema = mongoose.Schema({
  subject: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  done: {
    type: String,
  },
  startDate: {
    type: String,
    default: Date.now,
  },
  endDate: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },

  milestone: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
});
export const Goal = mongoose.model("Goal", goalSchema);
