const express = require("express");
const {
  addComment,
  getPostComment,
} = require("../controller/CommentController");

const router = express.Router();

router.get("/:id", getPostComment);
router.post("/", addComment);

module.exports = router;
