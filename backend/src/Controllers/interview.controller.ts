import { PDFParse } from "pdf-parse";
import asyncHandler from "../Utils/asyncHandler.js";
import type { Request, Response } from "express";
import { generateInterviewReport } from "../Services/ai.services.js";
import interviewReportModel from "../Model/interviewReport.model.js";
import sendResponse from "../Utils/sendResponse.js";

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

export const genarateInterviewController = { genarateInterviewReport };
