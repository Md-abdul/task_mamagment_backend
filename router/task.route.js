const express = require("express");
const taskRoute = express.Router();
const { taskModel } = require("../model/task.model");

taskRoute.post("/create", async (req, res) => {
  try {
    const task = new taskModel(req.body);
    await task.save();
    res.send({ msg: "New Task created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

taskRoute.get("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send(task);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

taskRoute.get("/", async (req, res) => {
  try {
    const tasks = await taskModel.find({ authorID: req.body.authorID });
    res.send(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

taskRoute.patch("/update/:taskID", async (req, res) => {
  const { taskID } = req.params;
  try {
    await taskModel.findByIdAndUpdate(taskID, req.body);
    res.json({ msg: `The task with ID ${taskID} has been updated` });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

taskRoute.delete("/delete/:taskID", async (req, res) => {
  const { taskID } = req.params;
  try {
    await taskModel.findByIdAndDelete(taskID);
    res.json({ msg: `The task with ID ${taskID} has been deleted` });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

module.exports = {
  taskRoute,
};
