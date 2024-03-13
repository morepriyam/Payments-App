const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: 20,
  },
  firstName: {
    type: String,
    trim: true,
    maxLength: 12,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 12,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  imageURL: {
    type: String,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    set: (v) => Math.round(v),
    min: 0,
    max: 1000000,
  },
});

const transactionSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      set: (v) => Math.round(v),
      max: 5000,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
    expireAfterSeconds: 3600,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account, Transaction };
