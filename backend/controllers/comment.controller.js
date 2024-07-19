const db = require("../models/sequelize.js");

// Create a new comment
const createComment = async (req, res) => {
  const { title, content, post_id, parent_comment_id } = req.body;
  const { user_id } = req.user; // Extract user_id from authenticated user

  try {
    const comment = await db.Comment.create({
      title,
      content,
      user_id,
      post_id,
      parent_comment_id,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all comments for a specific post
const getCommentsByPostId = async (req, res) => {
  const { post_id } = req.params;

  try {
    const comments = await db.Comment.findAll({ where: { post_id } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single comment by ID
const getCommentById = async (req, res) => {
  const { comment_id } = req.params;

  try {
    const comment = await db.Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  const { comment_id } = req.params;
  const { title, content } = req.body;
  const { user_id } = req.user;

  try {
    const comment = await db.Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.user_id !== user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    comment.title = title || comment.title;
    comment.content = content || comment.content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  const { user_id } = req.user;

  try {
    const comment = await db.Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.user_id !== user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await comment.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment,
};
