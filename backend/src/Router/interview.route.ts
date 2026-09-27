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

interviewRouter.get(
  "/recent",
  userMiddleware.authMiddleware,
  genarateInterviewController.recentInterview,
);
interviewRouter.get(
  "/generate-cv",
  userMiddleware.authMiddleware,
  genarateInterviewController.generateCustomCv,
);

interviewRouter.get(
  "/:id",
  userMiddleware.authMiddleware,
  genarateInterviewController.genarateInterviewReportByID,
);

interviewRouter.get(
  "/download-report/:id",
  userMiddleware.authMiddleware,
  genarateInterviewController.downloadReportPDF,
);

interviewRouter.post(
  "/generate-cv/:id",
  userMiddleware.authMiddleware,
  genarateInterviewController.generateCustomCv,
);

export default interviewRouter;
