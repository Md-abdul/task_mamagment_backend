const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

userRouter.post("/register", async (req, res) => {
  const { name, pass, email } = req.body;
  try {
    bcryptjs.hash(pass, 5, async (err, hash) => {
      if (err) throw err;
      const user = new userModel({ name, email, pass: hash });
      await user.save();
      res.send({ msg: "New User is registered successfully" });
    });
  } catch (err) {
    res.send({ err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
        bcryptjs.compare(pass, user.pass, (err, result) => {
        // if (err) throw err;
        if (result) {
          const token = jwt.sign(
            { authorID: user._id, author: user.name },
            "masaiII"
          );
          res.status(200).send({ msg: "Login successful", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Credential" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credential" });
    }
  } catch (err) {
    res.status(400).send({ err: "Some Err while Login" });
  }
});

module.exports = {
  userRouter,
};
