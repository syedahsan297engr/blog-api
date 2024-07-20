const db = require("../models/sequelize.js");
const errorHandler = require("../utils/error.js");
// Create a new comment
const createComment = async (req, res, next) => {
  const { title, content, post_id, parent_comment_id } = req.body;
  const { user_id } = req.user; // Extract user_id from authenticated user

  try {
    const post = await db.Post.findByPk(post_id);
    if (!post) {
      return next(errorHandler(404, "Post not Found"));
    }
    const comment = await db.Comment.create({
      title,
      content,
      user_id,
      post_id,
      parent_comment_id,
    });
    return res.status(201).json(comment);
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

// Get all comments for a specific post
const getCommentsByPostId = async (req, res, next) => {
  const { post_id } = req.params;

  try {
    // If a post is deleted, all comments associated with it should be deleted as well or not, in our case we are not deleting the comments, if we want to delete the associated comments, then we can specify this in the post controller in delete post
    const comments = await db.Comment.findAll({ where: { post_id } });
    return res.status(200).json(comments);
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

// Get a single comment by ID
const getCommentById = async (req, res, next) => {
  const { comment_id } = req.params;

  try {
    const comment = await db.Comment.findByPk(comment_id);
    if (!comment) {
      return next(errorHandler(404, "Comment not Found"));
    }
    return res.status(200).json(comment);
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

// Update a comment
const updateComment = async (req, res, next) => {
  const { comment_id } = req.params;
  const { title, content } = req.body;
  const { user_id } = req.user;

  try {
    const comment = await db.Comment.findByPk(comment_id);
    if (!comment) {
      return next(errorHandler(404, "Comment not Found"));
    }
    if (comment.user_id !== user_id) {
      return next(errorHandler(403, "ForBidden"));
    }

    comment.title = title || comment.title;
    comment.content = content || comment.content;
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

// Delete a comment
const deleteComment = async (req, res, next) => {
  const { comment_id } = req.params;
  const { user_id } = req.user;

  try {
    const comment = await db.Comment.findByPk(comment_id);
    if (!comment) {
      return next(errorHandler(404, "Comment not Found"));
    }
    if (comment.user_id !== user_id) {
      return next(errorHandler(403, "ForBidden"));
    }

    await comment.destroy();
    return res.status(204).end();
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment,
};
