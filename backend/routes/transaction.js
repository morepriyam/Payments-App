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

    const modifiedTransactions = transactions.map((transaction) => {
      const utcDate = new Date(transaction.created_at);

      const istDateString = utcDate.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });

      return {
        from: transaction.from.username,
        to: transaction.to.username,
        amount: transaction.amount,
        date: istDateString.split(", "),
      };
    });

    return res.status(200).json({ transactions: modifiedTransactions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed To Get Transactions" });
  }
});

module.exports = router;
