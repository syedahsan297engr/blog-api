const db = require("../models/sequelize");
const errorHandler = require("../utils/error.js");
// Create a new post
const createPost = async (req, res, next) => {
  const { title, content } = req.body;
  const { user_id } = req.user; // Extract user_id from authenticated user
  try {
    if (!title || !content) {
      return next(errorHandler(400, "Title and content are required"));
    }
    const post = await db.Post.create({
      title,
      content,
      user_id,
    });
    return res.status(201).json(post);
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

// Get all posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await db.Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

// Get a single post by ID
const getPostById = async (req, res, next) => {
  const { post_id } = req.params;

  try {
    const post = await db.Post.findByPk(post_id);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    return res.status(200).json(post);
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

// Update a post
const updatePost = async (req, res, next) => {
  const { post_id } = req.params;
  const { title, content } = req.body;
  const { user_id } = req.user;
  try {
    const post = await db.Post.findByPk(post_id);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    if (post.user_id !== user_id) {
      return next(errorHandler(403, "ForBidden"));
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

// Delete a post
const deletePost = async (req, res, next) => {
  const { post_id } = req.params;
  const { user_id } = req.user;
  try {
    const post = await db.Post.findByPk(post_id);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    if (post.user_id !== user_id) {
      return next(errorHandler(403, "ForBidden"));
    }

    await post.destroy();
    return res.status(204).end();
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
