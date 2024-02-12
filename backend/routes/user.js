const express = require("express");
const router = express.Router();
const { User, Account } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
  username: zod.string().min(3).max(30).trim(),
  password: zod.string().min(5).trim(),
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  phoneNumber: zod.number().optional(),
});

router.use("/signup", async (req, res) => {
  const body = req.body;
  const success = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Incorrect inputs" });
  }
  const { username, email, password, phoneNumber } = body;
  try {
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ message: "Email already taken" });
    }
    const phoneNumberCheck = await User.findOne({ phoneNumber });
    if (phoneNumberCheck) {
      return res.status(400).json({ message: "Number already taken" });
    }
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const dbUser = await User.create({ ...body, password: hashedPassword });
    await Account.create({
      userId: dbUser._id,
      balance: 1 + Math.random() * 10000,
    });
    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      JWT_SECRET
    );
    res.json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const signinSchema = zod.object({
  usernameOrEmailOrNumber: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const success = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Incorrect inputs" });
  }
  const { usernameOrEmailOrNumber, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [
        { username: usernameOrEmailOrNumber },
        { email: usernameOrEmailOrNumber },
        { number: usernameOrEmailOrNumber },
      ],
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Username / Email / Number" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const updateUserSchema = zod.object({
  email: zod.string().optional(),
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  imageURL: zod.string().optional(),
  phoneNumber: zod.number().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateUserSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information / Wrong Inputs",
    });
  }

  await User.updateOne(req.body, {
    _id: req.userId,
  });

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
      {
        username: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.post("/addfriend", authMiddleware, async (req, res) => {
  try {
    const me = await User.findOne({ _id: req.userId });
    const friend = await User.findOne({ username: req.body.username });
    me.friends.push(friend._id);
    await me.save();
    res.status(200).json({ message: "Added friend" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/friends", authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    const friends = await User.find({ _id: { $in: currentUser.friends } });
    const populatedFriends = await Promise.all(
      friends.map(async (friend) => {
        const isFriend = friend.friends.includes(req.userId);
        let fieldsToSelect;
        if (isFriend) {
          fieldsToSelect = "-friends -password";
        } else {
          fieldsToSelect = "username firstName lastName imageURL";
        }
        return await User.findOne({ _id: friend._id }).select(fieldsToSelect);
      })
    );
    res.status(200).json({ friends: populatedFriends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
