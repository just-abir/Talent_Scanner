import express from "express";
import cors from "cors";
import userRouter from "../src/Router/user.route.js";
import cookieParser from "cookie-parser";
import interviewRouter from "./Router/interview.route.js";
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);

export default app;
