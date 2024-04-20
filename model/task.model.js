const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    dueDate: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    author: { type: String, require: true },
    authorID: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const taskModel = mongoose.model("task", taskSchema);

module.exports = {
  taskModel
}