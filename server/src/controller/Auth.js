const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const cloudinary = require("../utils/cloudinary");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // check if user exists.
    if (!user) {
      return res.status(500).json({
        success: false,
        error: "User not found!",
      });
    }

    // check if password match.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        error: "Password incorrect!",
      });
    }

    // create token that contains user id
    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: 1000 * 60 * 30,
    });
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 30 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "User Authenticated!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to login",
    });
  }
};

const register = async (req, res) => {
  const { data, file } = req.body;
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "user",
    });
    const user = await User.findOne({ email: data.email });
    // check if email already registered
    if (user) {
      return res.status(500).json({
        success: false,
        message: "Email already used!",
      });
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = new User({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashPassword,
      location: data.location,
      occupation: data.occupation,
      profile: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User registered!",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the user.",
      error: error.message, // Include the actual error message for debugging
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.send("cookie removed");
};

module.exports = { register, login, logout };
