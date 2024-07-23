const config = {
  development: {
    username: "postgres",
    password: "password",
    database: "blogdbtest",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "your_database_username",
    password: "your_database_password",
    database: "your_test_database_name",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "your_database_username",
    password: "your_database_password",
    database: "your_production_database_name",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};

module.exports = config;
