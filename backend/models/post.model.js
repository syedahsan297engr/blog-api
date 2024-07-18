// models/post.js

import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js"; // Adjust path as needed
import User from "./user.model.js";
import Comment from "./comment.model.js";

const Post = sequelize.define("Post", {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Post.belongsTo(User, { foreignKey: "user_id" });
// Post.hasMany(Comment, { foreignKey: "post_id" });

export default Post;
