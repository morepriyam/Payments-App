const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", rootRouter);

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/paytm");
    app.listen(port, () => console.log(`listening port : ${port}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToMongoDB();
// Catch-all route handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Reached Error Handler" });
});
