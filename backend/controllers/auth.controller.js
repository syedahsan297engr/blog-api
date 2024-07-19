const bcrypt = require("bcryptjs");
const db = require("../models/sequelize");
const { generateToken } = require("../utils/jwt.js");

const signUp = async (req, res) => {
  const { user_name, email, password } = req.body;
  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      user_name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp, signIn };
