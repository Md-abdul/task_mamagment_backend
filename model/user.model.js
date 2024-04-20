const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: false },
    email: { type: String, require: false },
    pass: { type: String, require: false },
  },

  {
    versionKey: false,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
