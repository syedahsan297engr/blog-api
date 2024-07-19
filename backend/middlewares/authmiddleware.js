const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   //verifying the token
  //   if (err) return res.status(400).json({ message: "Invalid token." }); //if token is invalid then return this message
  //   req.user = user; //if token is valid then user is set to req.user
  //   next(); //calling the next middleware -> means that in routes you passed updateUser here that will be called implementation for this will be in controllers
  // });
};

module.exports = { authenticateJWT };
