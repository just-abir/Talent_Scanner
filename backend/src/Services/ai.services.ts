import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "A score between 0 and 100 indicating how well the candidate matches the job description.",
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical question that can be asked in the interview.",
          ),

        intention: z
          .string()
          .describe("The interviewer's intention behind asking this question."),

        answer: z
          .string()
          .describe(
            "How the candidate should answer this question and what points they should cover.",
          ),
      }),
    )
    .describe("Technical questions that can be asked during the interview."),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The behavioral question that can be asked in the interview.",
          ),

        intention: z
          .string()
          .describe("The interviewer's intention behind asking this question."),

        answer: z
          .string()
          .describe(
            "How the candidate should answer this question and what points they should cover.",
          ),
      }),
    )
    .describe("Behavioral questions that can be asked during the interview."),

  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill that the candidate is lacking."),

        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap based on its importance for the job.",
          ),
      }),
    )
    .describe("Skills that the candidate is missing or needs to improve."),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1."),

        focus: z.string().describe("The main focus of this preparation day."),

        tasks: z
          .array(z.string())
          .describe("List of tasks the candidate should complete on this day."),
      }),
    )
    .describe("A day-wise preparation plan for the candidate."),

  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated.",
    ),
});

interface GenerateInterviewReportInput {
  resume: unknown;
  selfDescription: unknown;
  jobDescription: unknown;
}

// export const generateInterviewReport = async ({
//   resume,
//   selfDescription,
//   jobDescription,
// }: GenerateInterviewReportInput) => {
//   const prompt = `Generate an interview report for a candidate with the following details  :
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription} with requiremnt Requirements:

// 1. Generate more than 7 technical interview questions.
// 2. Generate more than 4 behavioral interview questions.
// 3. Generate a 7-day preparation plan.
// 4. For each day, generate at least 3 tasks.
// 5. Do not generate fewer items than requested.`;

//   const response = await ai.models.generateContent({
//     model: "gemini-3.5-flash-lite",
//     contents: prompt,
//     config: {
//       responseMimeType: "application/json",
//       responseSchema: zodToJsonSchema(interviewReportSchema),
//     },
//   });

//   return JSON.parse(response.text ?? "{}");
// };

export const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}: GenerateInterviewReportInput) => {
  const prompt = `You are an expert technical recruiter and hiring manager. Evaluate the candidate strictly and realistically.

Candidate Information:
- Resume Content:
"""
${resume}
"""
- Self Description:
"""
${selfDescription}
"""
- Target Job Description:
"""
${jobDescription}
"""

Evaluation Guidelines:
1. **Match Score Calculation (0-100)**:
   - Base the match score primarily (70% weight) on verified evidence, skills, and experience found in the **Resume Content**.
   - Use the **Self Description** only as secondary context (30% weight).
   - If the resume is irrelevant, empty, a cover page, or lacks technical skills matching the Job Description, give a **LOW score (0 - 25)**.
   - Do NOT assume skills that are not explicitly mentioned in the resume or self description.
   - Be strict and honest — do not inflate scores.

2. **Report Generation Requirements**:
   - Generate at least 7 technical interview questions tailored to the gap between candidate experience and the job description.
   - Generate at least 4 behavioral interview questions.
   - Highlight all critical missing skills in "skillGaps" with appropriate severity.
   - Generate a comprehensive 7-day preparation plan (at least 3 tasks per day) focusing on the missing areas.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text ?? "{}");
};

const tailoredCvSchema = z.object({
  fullName: z.string(),
  contact: z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  professionalSummary: z
    .string()
    .describe(
      "3-4 sentence powerful ATS-friendly summary targeting the job description.",
    ),
  skills: z.object({
    technicalSkills: z.array(z.string()),
    softSkills: z.array(z.string()),
    toolsAndFrameworks: z.array(z.string()),
  }),
  experience: z.array(
    z.object({
      role: z.string(),
      company: z.string(),
      duration: z.string(),
      achievements: z
        .array(z.string())
        .describe(
          "Action-verb oriented, metric-driven bullet points matching JD keywords",
        ),
    }),
  ),
  projects: z.array(
    z.object({
      title: z.string(),
      technologies: z.array(z.string()),
      description: z.array(z.string()),
      link: z.string().optional(),
    }),
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      year: z.string(),
    }),
  ),
});

export const generateTailoredCV = async ({
  resume,
  selfDescription,
  jobDescription,
}: {
  resume: string;
  selfDescription: string;
  jobDescription: string;
}) => {
  const prompt = `You are a professional Executive Resume Writer and ATS optimization specialist.
Rewrite and optimize the candidate's CV so it strongly targets the Job Description while strictly staying truthful to the candidate's actual background.
Candidate Resume:
"""
${resume}
"""
Candidate Self Description:
"""
${selfDescription}
"""
Target Job Description:
"""
${jobDescription}
"""
Instructions:
1. Align the professional summary with the target role and core keywords from the Job Description.
2. Highlight matching technical skills and prioritize them.
3. Transform experience and project bullet points into high-impact (Action Verb + Context + Result/Metric) statements matching the JD requirements.
4. Keep the output fully structured in JSON.`;
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(tailoredCvSchema),
    },
  });
  return JSON.parse(response.text ?? "{}");
};
