const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");


// get all users
exports.getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        data: users
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


// get a User
exports.getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


// update a user
exports.updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
});



// Delete user
exports.deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
});

// Follow a User
exports.followUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// UnFollow a User
exports.unFollowUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
});