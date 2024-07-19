const db = require("../models/sequelize");
// Create a new post
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { user_id } = req.user; // Extract user_id from authenticated user
  try {
    const post = await db.Post.create({
      title,
      content,
      user_id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  const { post_id } = req.params;

  try {
    const post = await db.Post.findByPk(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { post_id } = req.params;
  const { title, content } = req.body;
  const { user_id } = req.user;
  try {
    const post = await db.Post.findByPk(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user_id !== user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.user;

  try {
    const post = await db.Post.findByPk(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user_id !== user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await post.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
