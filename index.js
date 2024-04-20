const express = require("express");
const app = express();
const { connection } = require("./db");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const { auth } = require("./middlewares/auth.middleware");
const { userRouter } = require("./router/user.route");
const { taskRoute } = require("./router/task.route");
require("dotenv").config();


app.use("/users", userRouter);
app.use(auth);
app.use("/tasks", taskRoute);

app.listen(9090, async () => {
  try {
    await connection;
    console.log("Connection established port 9090");
  } catch (err) {
    console.log(err);
  }
});
