const express = require("express");
const { authenticateJWT } = require("../middlewares/authmiddleware.js");
const {
  getPostsWithComments,
  getPostsByUserWithComments,
} = require("../controllers/post.comment.controller.js");

const router = express.Router();

// Route to get all posts with nested comments
router.get("/", getPostsWithComments);

// Route to get posts by user with nested comments
router.get("/user/:user_id", authenticateJWT, getPostsByUserWithComments);

module.exports = router;
