const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
      userId: { type: String, required: true },
      desc: String,
      likes: [],
      image: String,
    },
    {
      timestamps: true,
      versionKey: false,
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;