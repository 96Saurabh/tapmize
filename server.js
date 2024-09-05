require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routers
const UserInfoRouter = require("./Routers/UserInfo.Routers");
const MemberInfoRouter = require("./Routers/Mamber.Routers");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("DB failed to connect", error));

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    service: "Backend Tapmaz server",
    status: "active",
    time: new Date(),
  });
});

// User routers
app.use("/api/v1/profile", UserInfoRouter);
app.use("/api/v1", MemberInfoRouter);

// 404 Not Found Handler
app.use("*", (req, res) => {
  res.status(404).json({ errorMessage: "Route not found!" });
});

// Global Error Handler
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ errorMessage: "Something went wrong!" });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Backend server running at port ${PORT}`);
});
