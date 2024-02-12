const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => console.log("Running on 3000"));

// Catch-all route handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Reached error handler" });
});
