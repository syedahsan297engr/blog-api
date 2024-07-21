const db = require("../models/sequelize");
const { getCommentsByPostIdData } = require("./comment.controller.js");
const errorHandler = require("../utils/error.js");

const getPostsWithNestedComments = async (posts) => {
  return await Promise.all(
    posts.map(async (post) => {
      const postId = post.post_id; // Adjust according to your actual post model
      const comments = await getCommentsByPostIdData(postId);
      return {
        ...post.toJSON(),
        comments: comments, // Adjust according to the response structure from getCommentsByPostIdData
      };
    })
  );
};

// Utility function to get posts with nested comments
const getPostsWithComments = async (req, res, next) => {
  try {
    const posts = await db.Post.findAll(); // Fetch all posts

    // Fetch and nest comments for each post
    const postsWithComments = await getPostsWithNestedComments(posts);

    return res.status(200).json(postsWithComments);
  } catch (error) {
    console.error(error.message); // Optional: log the error message
    return next(errorHandler(500, "Internal server error"));
  }
};

// Utility function to get posts by user with nested comments
const getPostsByUserWithComments = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    if (parseInt(user_id) !== req.user.user_id) {
      return next(errorHandler(403, "Forbidden"));
    }
    // Fetch posts specific to the user
    const posts = await db.Post.findAll({ where: { user_id } });
    // Fetch and nest comments for each post
    const postsWithComments = await getPostsWithNestedComments(posts);
    return res.status(200).json(postsWithComments);
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

// Utility function to search posts by title or content
const searchPostsByTitleOrContent = async (req, res, next) => {
  const { title, content } = req.query;
  try {
    if (!title && !content) {
      return next(
        errorHandler(400, "Title or content query parameter is required")
      );
    }
    const posts = await db.Post.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { title: { [db.Sequelize.Op.iLike]: `%${title}%` } },
          { content: { [db.Sequelize.Op.iLike]: `%${content}%` } },
        ],
      },
    });

    const postsWithComments = await getPostsWithNestedComments(posts);

    return res.status(200).json(postsWithComments);
  } catch (error) {
    console.error(error.message);
    return next(errorHandler(500, "Internal server error"));
  }
};

module.exports = {
  getPostsWithComments,
  getPostsByUserWithComments,
  searchPostsByTitleOrContent,
};
