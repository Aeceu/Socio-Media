const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/SocialMedia");
    console.log("Connected to DB!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
