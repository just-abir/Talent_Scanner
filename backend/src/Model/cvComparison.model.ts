import mongoose, { Schema, Document } from "mongoose";

export interface ICandidateEvaluation {
  candidateName: string;
  rank: number;
  matchScore: number;
  summary: string;
  keyStrengths: string[];
  skillGaps: string[];
  recommendationTier: "Strong Fit" | "Potential Fit" | "Not Recommended";
}

export interface ICVComparison extends Document {
  user: mongoose.Types.ObjectId;
  jobTitle: string;
  jobDescription: string;
  selfDescription?: string;
  topPick: {
    candidateName: string;
    summary: string;
  };
  totalCandidates: number;
  candidates: ICandidateEvaluation[];
  createdAt: Date;
  updatedAt: Date;
}

const candidateEvaluationSchema = new Schema<ICandidateEvaluation>(
  {
    candidateName: { type: String, required: true },
    rank: { type: Number, required: true },
    matchScore: { type: Number, required: true, min: 0, max: 100 },
    summary: { type: String, required: true },
    keyStrengths: { type: [String], default: [] },
    skillGaps: { type: [String], default: [] },
    recommendationTier: {
      type: String,
      enum: ["Strong Fit", "Potential Fit", "Not Recommended"],
      required: true,
    },
  },
  { _id: false },
);

const cvComparisonSchema = new Schema<ICVComparison>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
    },
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    selfDescription: {
      type: String,
      default: "",
    },
    topPick: {
      candidateName: { type: String, required: true },
      summary: { type: String, required: true },
    },
    totalCandidates: {
      type: Number,
      required: true,
    },
    candidates: [candidateEvaluationSchema],
  },
  {
    timestamps: true,
  },
);

const CVComparisonModel = mongoose.model<ICVComparison>(
  "CVComparison",
  cvComparisonSchema,
);

export default CVComparisonModel;
