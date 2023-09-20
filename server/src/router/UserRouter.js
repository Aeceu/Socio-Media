const express = require("express");
const ImageUpload = require("../controller/ImageUpload");
const upload = require("../middleware/multer");
const { login, register, logout } = require("../controller/Auth");
const getID = require("../utils/getID");
const {
  UserData,
  getAllUsers,
  getUserFriend,
} = require("../controller/UserController");
const { UpdateUser, AddFriend } = require("../controller/UserController");

const router = express.Router();

// get all the users
router.post("/users", getAllUsers);

// get specific user
router.get("/users/:id");

// login
router.post("/login", login);

// logout
router.get("/logout", logout);

// register
router.post("/register", register);

// get user data
router.get("/userdata", UserData);

// update the user details
router.post("/update-user", UpdateUser);

// handle adding friends
router.post("/user/addfriend", AddFriend);

//get the user's friendlist
router.get("/user/friends/:id", getUserFriend);

module.exports = router;

// userID: 64eb77bab59f62ee4810d045 (John Doe)
// friendID: 64eb7e0053e43824978111cd (Jose)
