const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.log(error);
    if (session) {
      await session.abortTransaction();
    }
    return res.status(400).json({
      message: "Failed to transfer",
    });
  }
});

module.exports = router;
