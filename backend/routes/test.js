import express from "express";

const router = express.Router();

// Sample route
router.get("/sample", (req, res) => {
  res.send("This is a sample route");
});

export default router;
