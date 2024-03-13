require("dotenv").config();
const express = require("express");
const router = express.Router();
const { User, Account, Transaction } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN = process.env.ADMIN;
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
  username: zod.string().trim().min(1).max(20),
  password: zod.string().min(5).max(20),
  firstName: zod.string().trim().min(1).max(12).optional(),
  lastName: zod.string().trim().min(1).max(12).optional(),
  email: zod.string().email().max(35),
  phoneNumber: zod.number().int().max(9999999999),
});

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const success = signupSchema.safeParse(req.body);
    if (success.error) {
      return res.status(400).json({ message: "Incorrect Inputs" });
    }
    const { username, email, password, phoneNumber } = body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({ message: "Username Already Taken" });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ message: "Email Already Taken" });
    }
    const phoneNumberCheck = await User.findOne({ phoneNumber });
    if (phoneNumberCheck) {
      return res.status(400).json({ message: "Number Already Taken" });
    }
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const dbUser = await User.create({
      ...body,
      imageURL:
        "https://ui-avatars.com/api/?name=" +
        username.trim() +
        "&size=250&background=3866e3&color=ffffff",
      password: hashedPassword,
    });
    const amount = Math.floor(1 + Math.random() * 5000);
    await Account.create({
      userId: dbUser._id,
      username: dbUser.username,
      balance: amount,
    });
    await Transaction.create({
      from: ADMIN, // system-generated funds
      to: dbUser._id,
      amount: amount,
    });
    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      JWT_SECRET
    );
    return res.json({
      message: "User Created Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Signup Error" });
  }
});

const signinSchema = zod.object({
  usernameOrEmailOrNumber: zod.string().trim().min(1),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  //shorten this handler code
  try {
    const success = signinSchema.safeParse(req.body);
    if (success.error) {
      return res.status(400).json({ message: "Incorrect Inputs" });
    }
    const { usernameOrEmailOrNumber, password } = req.body;
    if (!parseInt(usernameOrEmailOrNumber)) {
      const user = await User.findOne({
        $or: [
          { username: usernameOrEmailOrNumber },
          { email: usernameOrEmailOrNumber },
        ],
      });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid Username / Email / Phone" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Password" });
      }
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );
      return res.json({
        message: "User Logged In",
        token,
      });
    } else {
      const user = await User.findOne({ phoneNumber: usernameOrEmailOrNumber });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid Username / Email / Number" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );
      return res.json({
        message: "User Signed In",
        token,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Signin Error" });
  }
});

const updateUserSchema = zod.object({
  password: zod.string().min(5).max(20).optional(),
  firstName: zod.string().min(1).max(12).optional(),
  lastName: zod.string().min(1).max(12).optional(),
  email: zod.string().email().max(20).optional(),
  phoneNumber: zod.number().int().max(9999999999).optional(),
  imageURL: zod.string().url().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const success = updateUserSchema.safeParse(req.body);
    if (success.error) {
      return res.status(411).json({
        message: "Error while updating Information / Wrong Inputs",
      });
    }
    await User.updateOne(
      {
        _id: req.userId,
      },
      success.data
    );
    return res.json({
      message: "Updated Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed To Update/Input Already Taken" });
  }
});

const filterSchema = zod.string();

router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    isString = filterSchema.safeParse(filter);
    if (isString.error) {
      return res.status(411).json({
        message: "Wrong Inputs",
      });
    }
    const users = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
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
        },
      ],
    });
    return res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        imageURL: user.imageURL,
      })),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Search Failed" });
  }
});

const usernameSchema = zod.string();

router.post("/addfriend", authMiddleware, async (req, res) => {
  try {
    const isString = usernameSchema.safeParse(req.body.username);
    if (isString.error) {
      return res.status(411).json({
        message: "Wrong Inputs",
      });
    }
    const me = await User.findOne({ _id: req.userId });
    const friend = await User.findOne({ username: req.body.username });
    if (friend) {
      if (me.friends.includes(friend._id)) {
        return res.status(200).json({ message: "Friend Already Added" });
      }
      me.friends.push(friend._id);
      await me.save();
      return res.status(200).json({ message: "Friend Added" });
    } else {
      return res.status(401).json({ message: "User Does Not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Add Friend Failed" });
  }
});

router.get("/friends", authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    const friends = await User.find({ _id: { $in: currentUser.friends } });
    const myFriends = [];
    const friendsIAdded = [];
    await Promise.all(
      friends.map(async (friend) => {
        const isFriend = friend.friends.includes(req.userId);
        let fieldsToSelect;
        if (isFriend) {
          fieldsToSelect = "-friends -password -_id";
        } else {
          fieldsToSelect = "username firstName lastName imageURL -_id";
        }
        const friendData = await User.findOne({ _id: friend._id }).select(
          fieldsToSelect
        );
        if (isFriend) {
          myFriends.push(friendData);
        } else {
          friendsIAdded.push(friendData);
        }
        return friendData;
      })
    );
    return res.status(200).json({ myFriends, friendsIAdded });
  } catch (error) {
    return res.status(500).json({ message: "Cannot Get Friends" });
  }
});

router.get("/receivedfriendrequests", authMiddleware, async (req, res) => {
  try {
    const usersWithFriend = await User.find({ friends: req.userId });
    const me = await User.findOne({ _id: req.userId });

    const removeExistingFriends = usersWithFriend.filter(
      (user) => !me.friends.includes(user._id)
    );
    const friendRequests = removeExistingFriends.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      imageURL: user.imageURL,
    }));
    return res.status(200).json({ friendRequests });
  } catch (error) {
    return res.status(500).json({ message: "Friend Req. Failed" });
  }
});

router.post("/me", authMiddleware, (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json();
  }
});

router.get("/userInfo", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }).select(
      "-_id -password -friends -__v"
    );
    if (user) {
      res.json({ user: user });
    }
  } catch (error) {
    res.status(500).json({ message: "Request Failed" });
  }
});
module.exports = router;
