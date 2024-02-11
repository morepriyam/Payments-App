const express = require("express");
const router = express.Router();
const { User } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
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
      return res.status(400).json({ message: "Email already in use" });
    }
    const phoneNumberCheck = await User.findOne({ phoneNumber });
    if (phoneNumberCheck) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const dbUser = await User.create({ ...body, password: hashedPassword });
    const token = jwt.sign(
      {
        userId: dbUser.firstName,
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
  usernameOrEmail: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const success = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Incorrect inputs" });
  }
  const { usernameOrEmail, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userId: user.firstName,
      },
      JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
