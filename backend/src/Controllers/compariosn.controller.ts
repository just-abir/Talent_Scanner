import type { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler.js";
import sendResponse from "../Utils/sendResponse.js";
import { PDFParse } from "pdf-parse";
import {
  extractTextFromBuffer,
  evaluateCandidateCV,
  generateComparisonSummary,
} from "../Services/ai.services.js";
import CVComparisonModel from "../Model/cvComparison.model.js";

const extractResumeText = async (
  file: Express.Multer.File,
): Promise<string> => {
  let text = "";
  if (file.mimetype === "application/pdf") {
    try {
      const parser = new PDFParse({ data: file.buffer });
      const parsed = await parser.getText();
      text = parsed.text?.trim() || "";
    } catch (err) {
      console.warn(`PDF parse fallback for ${file.originalname}`);
    }
  }

  if (!text || text.length < 50) {
    text = await extractTextFromBuffer(file.buffer, file.mimetype);
  }
  return text;
};

const compareCVs = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length < 2) {
    throw new Error("Please upload at least 2 CVs to compare");
  }

  const { jobTitle, jobDescription, selfDescription } = req.body;
  if (!jobTitle || !jobDescription) {
    throw new Error("Job title and job description are required");
  }

  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const parsedResumes = await Promise.all(
    files.map(async (file) => {
      const text = await extractResumeText(file);
      return {
        fileName: file.originalname,
        text,
      };
    }),
  );

  const evaluations = await Promise.all(
    parsedResumes.map((item) =>
      evaluateCandidateCV({
        resume: item.text,
        jobDescription,
        selfDescription,
        fileName: item.fileName,
      }),
    ),
  );

  evaluations.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  const rankedCandidates = evaluations.map((candidate, index) => ({
    ...candidate,
    rank: index + 1,
  }));

  const topSummaryResult = await generateComparisonSummary({
    jobDescription,
    topCandidates: rankedCandidates.slice(0, 3), // Pass top 3 to keep prompt tight
  });

  const comparisonRecord = await CVComparisonModel.create({
    user: req.user.id || req.user._id,
    jobTitle,
    jobDescription,
    selfDescription: selfDescription || "",
    totalCandidates: rankedCandidates.length,
    topPick: {
      candidateName:
        topSummaryResult.topCandidateName || rankedCandidates[0].candidateName,
      summary: topSummaryResult.reasoning || rankedCandidates[0].summary,
    },
    candidates: rankedCandidates,
  });

  return sendResponse(
    res,
    201,
    "CV comparison completed successfully",
    comparisonRecord,
  );
});

const getComparisonHistory = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("Unauthorized");
    }

    const comparisons = await CVComparisonModel.find({
      user: req.user.id || req.user._id,
    })
      .select("jobTitle totalCandidates topPick createdAt")
      .sort({ createdAt: -1 });

    return sendResponse(
      res,
      200,
      "Comparisons retrieved successfully",
      comparisons,
    );
  },
);

const getComparisonById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const comparison = await CVComparisonModel.findById(id);

  if (!comparison) {
    throw new Error("Comparison not found");
  }

  return sendResponse(
    res,
    200,
    "Comparison retrieved successfully",
    comparison,
  );
});

export const comparisonController = {
  compareCVs,
  getComparisonHistory,
  getComparisonById,
};
