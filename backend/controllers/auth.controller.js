const bcrypt = require("bcryptjs");
const db = require("../models/sequelize");
const errorHandler = require("../utils/error.js");
const { generateToken } = require("../utils/jwt.js");

const signUp = async (req, res, next) => {
  const { user_name, email, password } = req.body;
  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return next(errorHandler(400, "User already exists."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      user_name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user);
    return res.status(201).json({ token });
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return next(errorHandler(400, "Invalid email or password."));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(400, "Invalid email or password."));
    }

    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    return next(errorHandler(500, "Internal server error"));
  }
};

module.exports = { signUp, signIn };