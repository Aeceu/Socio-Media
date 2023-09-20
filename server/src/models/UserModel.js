const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    occupation: String,
    location: String,
    profile: {
      public_id: String,
      url: String,
    },
    friends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema) || mongoose.models("user");
module.exports = User;
