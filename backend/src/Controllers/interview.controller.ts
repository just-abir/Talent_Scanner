import { PDFParse } from "pdf-parse";
import asyncHandler from "../Utils/asyncHandler.js";
import type { Request, Response } from "express";
import {
  generateInterviewReport,
  generateTailoredCV,
} from "../Services/ai.services.js";
import interviewReportModel from "../Model/interviewReport.model.js";
import sendResponse from "../Utils/sendResponse.js";
import { error } from "node:console";

const genarateInterviewReport = asyncHandler(
  async (req: Request, res: Response) => {
    const parser = new PDFParse({
      data: req.file!.buffer,
    });

    const resumeResult = await parser.getText();

    const resumeContent = resumeResult.text;
    console.log("Resuemcontext: ", resumeContent);

    const { selfDescription, jobDescription } = req.body;

    if (!req.user) {
      throw new Error("Unauthorized");
    }

    const interviewRerpotAi = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });

    console.log("Aireport", interviewRerpotAi);

    const interviewInDB = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewRerpotAi,
    });

    return sendResponse(res, 201, "Interview message genarted", interviewInDB);
  },
);

const genarateInterviewReportByID = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const report = await interviewReportModel.findById(id);
    if (!report) {
      throw new Error("There is no Report found");
    }

    return sendResponse(res, 201, "Interview Report Find by Id", report);
  },
);

const recentInterview = asyncHandler(async (req: Request, res: Response) => {
  const interviewReports = await interviewReportModel
    .find({ user: req.user?.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );
  return sendResponse(res, 200, "Recetn hsitory", interviewReports);
});

const generateCustomCv = asyncHandler(async (req: Request, res: Response) => {
  const { resume, selfDescription, jobDescription } = req.body;

  const cvData = await generateTailoredCV({
    resume,
    selfDescription,
    jobDescription,
  });

  return sendResponse(res, 200, "CV generated succes", cvData);
});

export const genarateInterviewController = {
  genarateInterviewReport,
  genarateInterviewReportByID,
  recentInterview,
  generateCustomCv,
};
