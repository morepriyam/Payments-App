require("dotenv").config();
const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", rootRouter);

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(process.env.PORT, () =>
      console.log(`listening port : ${process.env.PORT}`)
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToMongoDB();

// Catch-all route handler
app.use((req, res, next) => {
  return res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  return res.status(500).json({ message: "Reached Error Handler" });
});
