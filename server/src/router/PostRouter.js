const express = require("express");
const {
  newPost,
  getAllPost,
  deletePost,
  UpdatePost,
  getPost,
  HandleLikes,
  getLikes,
} = require("../controller/PostController");

const router = express.Router();

router.get("/", getAllPost);
router.post("/like", getLikes);
router.get("/user/:id", getPost);
router.post("/:id", newPost);
router.post("/delete/:id", deletePost);
router.post("/update/:id", UpdatePost);
router.post("/like/:id", HandleLikes);
module.exports = router;
