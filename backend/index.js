const express = require("express");
const { checkConnection } = require("./utils/checkConnection.js");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

checkConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
