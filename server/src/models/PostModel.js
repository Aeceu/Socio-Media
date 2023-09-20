const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    post: String,
    img: {
      publicID: String,
      url: String,
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        comment: String,
        commentor: {
          type: mongoose.Schema.ObjectId,
          ref: "user",
        },
      },
    ],
  },
  { timestamps: true }
);

const Posts = mongoose.model("posts", postSchema) || mongoose.models("posts");
module.exports = Posts;
