import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import carRouter from "./routes/cars.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(express.json()); //allow json as the input of the server
app.use(cookieParser());

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

app.use("/server/user", userRouter);

app.use("/server/auth", authRouter);

app.use("/server/cars", carRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
