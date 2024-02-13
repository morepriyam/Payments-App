const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, Transaction } = require("../db");
const zod = require("zod");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ error: "Account Not Found" });
    }
    res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot Get Balance" });
  }
});

const transferSchema = zod.object({
  to: zod.string(),
  amount: zod.number(),
});
router.post("/transfer", authMiddleware, async (req, res) => {
  let session;
  try {
    schemaCheck = transferSchema.safeParse(req.body);
    if (schemaCheck.error) {
      return res.status(400).json({ message: "Incorrect Inputs" });
    }
    session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid Account",
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

    await Transaction.create({
      from: req.userId,
      to: to,
      amount: amount,
    });

    await session.commitTransaction();
    res.json({
      message: "Transfer Successful",
    });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    return res.status(400).json({
      message: "Failed To Transfer",
    });
  }
});

const depositSchema = zod.number();

router.post("/deposit", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const isNumber = depositSchema.safeParse(amount);
    if (isNumber.error) {
      return res.status(400).json({ message: "Incorrect Inputs" });
    }
    const userAccount = await Account.findOne({ userId: req.userId });
    userAccount.balance += amount;
    userAccount.save();
    await Transaction.create({
      from: null, // system-generated funds
      to: req.userId,
      amount: amount,
    });
    res.status(200).json({ message: "Deposit Done" });
  } catch (error) {
    res.status(500).json({ error: "Deposit Failed" });
  }
});

module.exports = router;
