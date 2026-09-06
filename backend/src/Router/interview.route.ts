import express from "express";
import userMiddleware from "../Middlewares/auth.middlewares.js";
import { genarateInterviewController } from "../Controllers/interview.controller.js";
import upload from "../Middlewares/multer.middlewares.js";

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  userMiddleware.authMiddleware,
  upload.single("resume"),
  genarateInterviewController.genarateInterviewReport,
);

export default interviewRouter;
