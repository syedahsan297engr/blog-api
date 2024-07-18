"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/db.config.js").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models and assign them to the db object
db.User = require("./user.model.js")(sequelize, DataTypes);
db.Post = require("./post.model.js")(sequelize, DataTypes);
db.Comment = require("./comment.model.js")(sequelize, DataTypes);

// Set up associations after all models are defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
