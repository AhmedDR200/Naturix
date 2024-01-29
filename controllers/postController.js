const Post = require('../models/postModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');


// Creat new Post
exports.createPost = asyncHandler(async (req, res) => {
    const newPost = new Post(req.body);
  
    try {
      await newPost.save();
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json(error);
    }
});
  

// Get a post
exports.getPost = asyncHandler(async (req, res) => {
    const id = req.params.id;
  
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
});
  

// Update a post
exports.updatePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await Post.findById(postId);
      if (post.userId === userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post Updated");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
});
  
// Delete a post
exports.deletePost = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await Post.findById(id);
      if (post.userId === userId) {
        await post.deleteOne();
        res.status(200).json("POst deleted successfully");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
});
  

// like/dislike a post
exports.likePost = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await Post.findById(id);
      if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("Post liked");
      } else {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("Post Unliked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
});
  

// Get Timeline Posts
exports.getTimelinePosts = asyncHandler(async (req, res) => {
    const userId = req.params.id;
  
    try {
      const currentUserPosts = await Post.find({ userId: userId });
      const followingPosts = await User.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  
      res
        .status(200)
        .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
        })
        );
    } catch (error) {
      res.status(500).json(error);
    }
});