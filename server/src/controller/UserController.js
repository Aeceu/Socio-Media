const User = require("../models/UserModel");
const cloudinary = require("../utils/cloudinary");
const getToken = require("../utils/getToken");

const getCookie = async (req, res) => {
  res.json(req.cookies);
};

const getAllUsers = async (req, res) => {
  const { userID } = req.body;
  try {
    const userloggedIn = await User.findById(userID);
    const allusers = await User.find({});

    const notuserfriends = allusers.filter((user) => {
      return (
        user._id.toString() !== userloggedIn._id.toString() && // Exclude current user
        !userloggedIn.friends.includes(user._id.toString()) // Check if not friends with the user
      );
    });

    res.status(200).json({
      success: true,
      notuserfriends,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all users.",
    });
  }
};

const UserData = async (req, res) => {
  try {
    const id = getToken(req);
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "Gets User Successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get userdata.",
    });
  }
};

const UpdateUser = async (req, res) => {
  const { newData, file } = req.body;
  try {
    const user = await User.findById(newData._id);
    if (!user) {
      res.status(500).json({
        success: false,
        error: "No user found!",
      });
    }

    user.firstname = newData.firstname;
    user.lastname = newData.lastname;
    user.email = newData.email;
    user.location = newData.location;
    user.occupation = newData.occupation;

    if (file) {
      //* get the image in cloudinary and delete
      const imgID = user.profile.public_id;
      await cloudinary.uploader.destroy(imgID);

      //* upload a new image and replace in database
      const result = await cloudinary.uploader.upload(file, {
        folder: "user",
      });

      user.profile.public_id = result.public_id;
      user.profile.url = result.secure_url;
    }

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Details Updated!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update user.",
    });
  }
};

const AddFriend = async (req, res) => {
  const { userID, friendID } = req.body;
  try {
    const user = await User.findById(userID);
    const friend = await User.findById(friendID);

    if (user.friends.includes(friendID)) {
      user.friends = user.friends.filter((id) => id !== friendID);
      friend.friends = friend.friends.filter((id) => id !== userID);
    } else {
      user.friends.push(friendID);
      friend.friends.push(userID);
    }

    await user.save();
    await friend.save();

    res.status(200).json({
      success: true,
      message: "User added!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add  a friend.",
    });
  }
};

const getUserFriend = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);

    const userfriends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = userfriends.map(
      ({ _id, firstname, lastname, email, occupation, location, profile }) => {
        return {
          _id,
          firstname,
          lastname,
          email,
          occupation,
          location,
          profile,
        };
      }
    );

    res.status(200).json({
      success: true,
      formattedFriends,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add  a friend.",
    });
  }
};

module.exports = {
  getCookie,
  UserData,
  UpdateUser,
  getAllUsers,
  AddFriend,
  getUserFriend,
};
