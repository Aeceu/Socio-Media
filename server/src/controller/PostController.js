const cloudinary = require("../utils/cloudinary");
const Posts = require("../models/PostModel");

const newPost = async (req, res) => {
  const { post, img } = req.body;
  const id = req.params.id;
  try {
    if (img) {
      //? if theres an image
      const result = await cloudinary.uploader.upload(img, {
        folder: "posts",
      });
      const newPost = await new Posts({
        creator: id,
        post: post,
        img: {
          publicID: result.public_id,
          url: result.secure_url,
        },
      });
      await newPost.save();
    } else {
      //? if there is no image
      const newPost = await new Posts({
        creator: id,
        post: post,
      });
      await newPost.save();
    }
    res.status(200).json({
      success: true,
      message: "Posted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to post.",
    });
  }
};

const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await Posts.findById(id).populate({
      path: "creator",
      select: "-password",
    });
    res.status(200).json({
      success: true,
      message: "Fetch all posts successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all posts.",
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Posts.find({}).populate({
      path: "creator likes",
      select: "-password",
    });
    res.status(200).json({
      success: true,
      message: "Fetch all posts successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all posts.",
    });
  }
};

const deletePost = async (req, res) => {
  const postID = req.params.id;
  try {
    const post = await Posts.findById(postID);

    //check if post has image
    if (post.img.publicID) {
      await cloudinary.uploader.destroy(post.img.publicID);
    }
    const deletePost = await Posts.findByIdAndRemove(postID);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      deletePost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete  posts.",
    });
  }
};

const UpdatePost = async (req, res) => {
  const { newPost, file } = req.body;
  const postID = req.params.id;
  try {
    const post = await Posts.findById(postID);
    if (!post) {
      return res.status(500).json({
        success: false,
        error: "No post found!",
      });
    }

    /*
      check if the post have image, if not add one 
    */
    if (!post.img.url) {
      if (file) {
        const result = await cloudinary.uploader.upload(file, {
          folder: "posts",
        });
        post.img.publicID = result.public_id;
        post.img.url = result.secure_url;
      }
    } else {
      // if the post has image and need to update
      if (file) {
        //* get the image in cloudinary and delete
        const imgID = post.img.publicID;
        await cloudinary.uploader.destroy(imgID);

        //* upload a new image and replace in database
        const result = await cloudinary.uploader.upload(file, {
          folder: "posts",
        });
        post.img.publicID = result.public_id;
        post.img.url = result.secure_url;
      }
    }

    post.post = newPost;
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post Updated!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete  posts.",
    });
  }
};

const getLikes = async (req, res) => {
  const { userID, postID } = req.body;
  try {
    const post = await Posts.findById(postID);

    const isLiked = post.likes.some((like) => like.toString() === userID);

    res.status(200).json({ count: post.likes.length, isLiked });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get like count of   posts.",
    });
  }
};

const HandleLikes = async (req, res) => {
  const postID = req.params.id;
  const { likerID } = req.body;
  try {
    const post = await Posts.findById(postID);

    const existingLikeIndex = post.likes.findIndex(
      (like) => like.toString() === likerID
    );

    if (existingLikeIndex !== -1) {
      post.likes.splice(existingLikeIndex, 1); // Remove the existing like (user ID)
    } else {
      // Push the new like (user ID) only if it's not already in the array
      if (!post.likes.includes(likerID)) {
        post.likes.push(likerID);
      }
    }

    await post.save(); // Save the updated post with modified likes array

    res.status(200).json({ post: post.likes.length, allpost: post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to like  posts.",
    });
  }
};

module.exports = {
  newPost,
  getAllPost,
  deletePost,
  UpdatePost,
  getPost,
  HandleLikes,
  getLikes,
};
