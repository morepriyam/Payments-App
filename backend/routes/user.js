const express = require("express");
const router = express.Router();
const { User, Account, Transaction } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
  username: zod.string().min(1).max(15).trim(),
  password: zod.string().min(5).trim(),
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  phoneNumber: zod.number().int().optional(),
});

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const success = signupSchema.safeParse(req.body);
    if (success.error) {
      res.status(400).json({ message: "Incorrect Inputs" });
    }
    const { username, email, password, phoneNumber, firstName, lastName } =
      body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      res.status(400).json({ message: "Username Already Taken" });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      res.status(400).json({ message: "Email Already Taken" });
    }
    const phoneNumberCheck = await User.findOne({ phoneNumber });
    if (phoneNumberCheck) {
      res.status(400).json({ message: "Number Already Taken" });
    }
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const dbUser = await User.create({
      ...body,
      imageURL:
        "https://ui-avatars.com/api/?name=" + //https://ui-avatars.com/api/?name=priyam+more&size=250&background=3866e3&color=ffffff
        firstName +
        "+" +
        lastName +
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
      from: null, // system-generated funds
      to: dbUser._id,
      amount: amount,
    });
    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      JWT_SECRET
    );
    res.json({
      message: "User Created Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup Error" });
  }
});

const signinSchema = zod.object({
  usernameOrEmailOrNumber: zod.string().or(zod.number()),
  password: zod.string(),
});
const phoneNumberSchema = zod.number().int();

router.post("/signin", async (req, res) => {
  //shorten this handler code
  try {
    const success = signinSchema.safeParse(req.body);
    if (success.error) {
      res.status(400).json({ message: "Incorrect Inputs" });
    }
    const { usernameOrEmailOrNumber, password } = req.body;
    const isNumber = phoneNumberSchema.safeParse(usernameOrEmailOrNumber);
    if (isNumber.error) {
      const user = await User.findOne({
        $or: [
          { username: usernameOrEmailOrNumber },
          { email: usernameOrEmailOrNumber },
        ],
      });
      if (!user) {
        res.status(401).json({ message: "Invalid Username / Email / Number" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Invalid Credentials" });
      }
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );
      res.json({ token });
    } else {
      const user = await User.findOne({ phoneNumber: usernameOrEmailOrNumber });
      if (!user) {
        res.status(401).json({ message: "Invalid Username / Email / Number" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Invalid Credentials" });
      }
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );
      res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: "Signin Error" });
  }
});

const updateUserSchema = zod.object({
  email: zod.string().optional(),
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  imageURL: zod.string().optional(),
  phoneNumber: zod.number().int().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const success = updateUserSchema.safeParse(req.body);
    if (success.error) {
      res.status(411).json({
        message: "Error while updating Information / Wrong Inputs",
      });
    }
    await User.updateOne(
      {
        _id: req.userId,
      },
      success.data
    );
    res.json({
      message: "Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed To Update" });
  }
});

const filterSchema = zod.string();

router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    isString = filterSchema.safeParse(filter);
    if (isString.error) {
      res.status(411).json({
        message: "Wrong Inputs",
      });
    }
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
        imageURL: user.imageURL,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Search Failed" });
  }
});

const usernameSchema = zod.string();

router.post("/addfriend", authMiddleware, async (req, res) => {
  try {
    const isString = usernameSchema.safeParse(req.body.username);
    if (isString.error) {
      res.status(411).json({
        message: "Wrong Inputs",
      });
    }
    const me = await User.findOne({ _id: req.userId });
    const friend = await User.findOne({ username: req.body.username });
    if (friend) {
      me.friends.push(friend._id);
      await me.save();
      res.status(200).json({ message: "Friend Added" });
    } else {
      res.status(401).json({ message: "User Does Not Exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Add Friend Failed" });
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
    res.status(500).json({ message: "Cannot Get" });
  }
});

router.get("/receivedfriendrequests", authMiddleware, async (req, res) => {
  try {
    const usersWithFriend = await User.find({ friends: req.userId });
    const removeExistingFriends = usersWithFriend.filter(
      (user) => !user.friends.includes(req.userId)
    );
    const friendRequests = removeExistingFriends.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      imageURL: user.imageURL,
    }));
    res.status(200).json({ friendRequests });
  } catch (error) {
    res.status(500).json({ message: "Friend Req. Failed" });
  }
});

module.exports = router;
