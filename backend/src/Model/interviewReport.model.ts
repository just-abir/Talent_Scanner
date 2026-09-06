import mongoose, { Schema } from "mongoose";

type Severity = "low" | "medium" | "high";

interface QuestionSchema {
  question: string;
  intention: string;
  answer: string;
}

interface SkillSchema {
  skill: string;
  severity: Severity;
}

interface PreparationPlanSchema {
  day: number;
  focus: string;
  tasks: string[];
}

interface InterviewReportSchema {
  jobDescription: string;
  resume?: string;
  selfDescription?: string;
  matchScore?: number;

  technicalQuestions: QuestionSchema[];
  behavioralQuestions: QuestionSchema[];
  skillGaps: SkillSchema[];
  preparationPlan: PreparationPlanSchema[];

  user?: mongoose.Types.ObjectId;
  title: string;
}
const technicalQuestionSchema = new Schema<QuestionSchema>(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionSchema = new Schema<QuestionSchema>(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new Schema<SkillSchema>(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new Schema<PreparationPlanSchema>({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  tasks: [
    {
      type: String,
      required: [true, "Task is required"],
    },
  ],
});

const interviewReportSchema = new Schema<InterviewReportSchema>(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },

    resume: {
      type: String,
    },

    selfDescription: {
      type: String,
    },

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    technicalQuestions: [technicalQuestionSchema],

    behavioralQuestions: [behavioralQuestionSchema],

    skillGaps: [skillGapSchema],

    preparationPlan: [preparationPlanSchema],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      // required: [true, "Job title is required"],
    },
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = mongoose.model<InterviewReportSchema>(
  "InterviewReport",
  interviewReportSchema,
);

export default interviewReportModel;
