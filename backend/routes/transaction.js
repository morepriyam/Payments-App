const express = require("express");
const { authMiddleware } = require("../middleware");
const { Transaction } = require("../db");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ from: req.userId }, { to: req.userId }],
    })
      .populate("from", "username")
      .populate("to", "username");

    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ message: "Failed To Get Transactions" });
  }
});

module.exports = router;
