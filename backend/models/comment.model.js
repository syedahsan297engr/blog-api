// models/comment.js

import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js"; // Adjust path as needed

const Comment = sequelize.define("Comment", {
  comment_id: {
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
  parent_comment_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// Comment.belongsTo(sequelize.models.User, { foreignKey: "user_id" });
// Comment.belongsTo(sequelize.models.Post, { foreignKey: "post_id" });

export default Comment;
