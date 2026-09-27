import { PDFParse } from "pdf-parse";
import asyncHandler from "../Utils/asyncHandler.js";
import type { Request, Response } from "express";
import {
  extractTextFromBuffer,
  generateInterviewReport,
  generateReportPDF,
  generateTailoredCV,
} from "../Services/ai.services.js";
import interviewReportModel from "../Model/interviewReport.model.js";
import sendResponse from "../Utils/sendResponse.js";
import { error } from "node:console";

const genarateInterviewReport = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new Error("No resume file uploaded");
    }

    let resumeContent = "";
    const mimeType = req.file.mimetype;

    if (mimeType === "application/pdf") {
      try {
        const parser = new PDFParse({ data: req.file.buffer });
        const resumeResult = await parser.getText();
        resumeContent = resumeResult.text?.trim() || "";
      } catch (err) {
        console.warn("pdf-parse failed, falling back to Vision OCR", err);
      }
    }

    if (!resumeContent || resumeContent.length < 50) {
      resumeContent = await extractTextFromBuffer(req.file.buffer, mimeType);
    }
    const { selfDescription, jobDescription } = req.body;

    if (!req.user) {
      throw new Error("Unauthorized");
    }

    const interviewRerpotAi = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });

    if (!interviewRerpotAi.isValidResume) {
      const rejectedReportInDB = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        isValidResume: false,
        rejectionReason:
          interviewRerpotAi.rejectionReason ||
          "Uploaded file is not a valid resume.",
        matchScore: 0,
        title: "Invalid Resume Submitted",
        technicalQuestions: [],
        behavioralQuestions: [],
        skillGaps: [],
        preparationPlan: [],
      });
      return sendResponse(
        res,
        201,
        "Resume verification failed",
        rejectedReportInDB,
      );
    }

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
  const { id } = req.params;
  const report = await interviewReportModel.findById(id);

  if (!report) {
    throw new Error("Interview report not found");
  }
  if (!report.resume) {
    throw new Error("Resume content not found for this report");
  }
  const cvData = await generateTailoredCV({
    resume: report.resume,
    selfDescription: report.selfDescription || "",
    jobDescription: report.jobDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${id}.pdf`,
  });

  res.send(cvData);
});

const downloadReportPDF = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const report = await interviewReportModel.findById(id);

  if (!report) {
    throw new Error("Interview report not found");
  }

  const pdfBuffer = await generateReportPDF(report);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=interview_prep_${id}.pdf`,
  });

  return res.send(pdfBuffer);
});

export const genarateInterviewController = {
  genarateInterviewReport,
  genarateInterviewReportByID,
  recentInterview,
  generateCustomCv,
  downloadReportPDF,
};
