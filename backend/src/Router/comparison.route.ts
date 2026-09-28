import express from "express";
import userMiddleware from "../Middlewares/auth.middlewares.js";
import upload from "../Middlewares/multer.middlewares.js";

import { comparisonController } from "../Controllers/compariosn.controller.js";

const comparisonRouter = express.Router();

comparisonRouter.post(
  "/",
  userMiddleware.authMiddleware,
  upload.array("resumes", 10),
  comparisonController.compareCVs,
);

comparisonRouter.get(
  "/history",
  userMiddleware.authMiddleware,
  comparisonController.getComparisonHistory,
);

comparisonRouter.get(
  "/:id",
  userMiddleware.authMiddleware,
  comparisonController.getComparisonById,
);

export default comparisonRouter;
