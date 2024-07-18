"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: "user_id" });
      Comment.belongsTo(models.Post, { foreignKey: "post_id" });
    }
  }

  Comment.init(
    {
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Post",
          key: "post_id",
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      freezeTableName: true,
      modelName: "Comment",
    }
  );

  return Comment;
};
