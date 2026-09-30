import express from "express";
import cors from "cors";
import userRouter from "../src/Router/user.route.js";
import cookieParser from "cookie-parser";
import interviewRouter from "./Router/interview.route.js";
import comparisonRouter from "./Router/comparison.route.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);

app.use("/api/comparison", comparisonRouter);
export default app;
