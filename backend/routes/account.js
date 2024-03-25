require("dotenv").config();
const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, Transaction } = require("../db");
const zod = require("zod");
const router = express.Router();
const ADMIN = process.env.ADMIN;
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ message: "Account Not Found" });
    }
    return res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    return res.status(500).json({ message: "Cannot Get Balance" });
  }
});

const transferSchema = zod.object({
  to: zod.string(),
  amount: zod.number().int().min(1).max(5000),
});

router.post("/transfer", authMiddleware, async (req, res) => {
  let session;
  try {
    schemaCheck = transferSchema.safeParse(req.body);
    if (schemaCheck.error) {
      return res.status(400).json({ message: "amount(int.) < 5000 > 0" });
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

    const toAccount = await Account.findOne({ username: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid Account",
      });
    }

    if (toAccount.balance >= 1000000 || toAccount.balance + amount >= 1000000) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Receiver Reached Max. Balance",
      });
    }
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { username: to },
      { $inc: { balance: amount } }
    ).session(session);

    await Transaction.create({
      from: req.userId,
      to: toAccount.userId,
      amount: amount,
    });

    await session.commitTransaction();
    return res.json({
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

const depositSchema = zod.number().int().min(1).max(5000);

router.post("/deposit", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const isNumber = depositSchema.safeParse(amount);
    if (isNumber.error) {
      return res.status(400).json({ message: "amount(int.) < 5000 > 0" });
    }
    const userAccount = await Account.findOne({ userId: req.userId });
    if (userAccount.balance <= 1000000) {
      userAccount.balance += amount;
      await userAccount.save();
      await Transaction.create({
        from: ADMIN, // system-generated funds
        to: req.userId,
        amount: amount,
      });
      return res
        .status(200)
        .json({ message: "Deposit Done", balance: userAccount.balance });
    } else {
      return res.status(500).json({ message: "Max-Balance - 1000000" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Deposit Failed" });
  }
});

module.exports = router;
