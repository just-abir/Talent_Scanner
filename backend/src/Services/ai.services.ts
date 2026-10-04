import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const interviewReportSchema = z.object({
  isValidResume: z
    .boolean()
    .describe(
      "True if the uploaded content is an actual professional resume/CV, false if it is random text, essay, medical document, or irrelevant.",
    ),
  rejectionReason: z
    .string()
    .optional()
    .describe(
      "If isValidResume is false, provide a clear explanation why it was rejected",
    ),

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
  const prompt = `You are an expert technical recruiter and hiring manager. Evaluate the candidate strictly and realistically and follow some regulation and  rules like - Check if the provided Resume Content is actually a legitimate Resume/CV.
- If the content is random text, story, unrelated article, or empty, set "isValidResume": false, explain why in "rejectionReason", set "matchScore": 0, and do NOT hallucinate experience or interview questions.
 If valid, evaluate candidate skills against the target Job Description..

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

const generatePDF = async (htmlContent: string) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "domcontentloaded",
    });

    return await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    });
  } finally {
    await browser.close();
  }
};

const tailoredCvSchema = z.object({
  html: z
    .string()
    .describe(
      "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
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
Rewrite and optimize the candidate's CV so it strongly targets the Job Description while strictly staying truthful to the candidate's actual background.and aalso   the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    
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
  const jsonContent = JSON.parse(response.text ?? "{}");

  const pdfBuffer = await generatePDF(jsonContent.html);
  return pdfBuffer;
};

export const extractTextFromBuffer = async (
  buffer: Buffer,
  mimeType: string,
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: [
      {
        inlineData: {
          data: buffer.toString("base64"),
          mimeType: mimeType,
        },
      },
      "Extract all text from this resume/CV document accurately preserving structure and details. Return only the extracted text.",
    ],
  });

  return response.text ?? "";
};

export const generateReportPDF = async (report: any) => {
  const html = ` 
    <!DOCTYPE html> 
    <html lang="en"> 
    <head> 
      <meta charset="UTF-8"> 
      <style> 
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1f2937; line-height: 1.5; padding: 20px; } 
        h1 { color: #111827; font-size: 24px; border-bottom: 2px solid #111827; padding-bottom: 8px; margin-bottom: 4px; } 
        .meta { color: #6b7280; font-size: 13px; margin-bottom: 25px; } 
        h2 { color: #111827; font-size: 18px; margin-top: 25px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; } 
        .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; margin-bottom: 12px; page-break-inside: avoid; } 
        .q-title { font-weight: 700; color: #111827; font-size: 14px; margin-bottom: 6px; } 
        .intention { font-size: 12px; color: #4b5563; margin-bottom: 8px; font-style: italic; } 
        .answer { font-size: 12px; color: #1f2937; background: #ffffff; padding: 10px; border-left: 3px solid #111827; border-radius: 4px; } 
        .day-badge { display: inline-block; background: #000000; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; } 
        .focus { font-weight: 600; font-size: 14px; color: #1f2937; margin: 6px 0; } 
        ul { margin: 6px 0; padding-left: 20px; font-size: 12px; color: #374151; } 
        li { margin-bottom: 4px; } 
      </style> 
    </head> 
    <body> 
      <h1>${report.title || "Interview Preparation Guide"}</h1> 
      <div class="meta"> 
        Target Role · Match Score: ${report.matchScore ?? 0}% · Generated on: ${new Date().toLocaleDateString()} 
      </div> 

      <!-- 1. TECHNICAL QUESTIONS --> 
      <h2>1. Technical Questions (${report.technicalQuestions?.length || 0})</h2> 
      ${
        report.technicalQuestions
          ?.map(
            (q: any, i: number) => ` 
        <div class="card"> 
          <div class="q-title">Q${i + 1}:${q.question}</div> 
          <div class="intention"><strong>Interviewer Intention:</strong> ${q.intention}</div> 
          <div class="answer"><strong>Suggested Answer / Approach:</strong><br/>${q.answer}</div> 
        </div> 
      `,
          )
          .join("") || "<p>None</p>"
      } 

      <!-- 2. BEHAVIORAL QUESTIONS --> 
      <h2>2. Behavioral Questions (${report.behavioralQuestions?.length || 0})</h2> 
      ${
        report.behavioralQuestions
          ?.map(
            (q: any, i: number) => ` 
        <div class="card"> 
          <div class="q-title">Q${i + 1}:${q.question}</div> 
          <div class="intention"><strong>Interviewer Intention:</strong> ${q.intention}</div> 
          <div class="answer"><strong>Suggested Answer:</strong><br/>${q.answer}</div> 
        </div> 
      `,
          )
          .join("") || "<p>None</p>"
      } 

      <!-- 3. ROADMAP / PREPARATION PLAN --> 
      <h2>3. Preparation Roadmap Plan (${report.preparationPlan?.length || 0} Days)</h2> 
      ${
        report.preparationPlan
          ?.map(
            (p: any) => ` 
        <div class="card"> 
          <span class="day-badge">Day ${p.day}</span> 
          <div class="focus">${p.focus}</div> 
          <ul> 
            ${p.tasks?.map((t: string) => `<li>${t}</li>`).join("")} 
          </ul> 
        </div> 
      `,
          )
          .join("") || "<p>None</p>"
      } 
    </body> 
    </html> 
  `;

  return await generatePDF(html);
};

//Featrue for Multiple cv upload

// 1. Schema for evaluating a single candidate
const singleCandidateEvaluationSchema = z.object({
  candidateName: z
    .string()
    .describe(
      "Extracted candidate full name from resume, or 'Unknown Candidate'",
    ),
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Realistic match score from 0 to 100 matching the Job Description",
    ),
  summary: z
    .string()
    .describe("A 2-3 sentence summary of candidate profile and qualification"),
  keyStrengths: z
    .array(z.string())
    .describe("Top 3-5 technical or professional strengths matching the job"),
  skillGaps: z
    .array(z.string())
    .describe("Key skills or experiences required by the job that are missing"),
  recommendationTier: z
    .enum(["Strong Fit", "Potential Fit", "Not Recommended"])
    .describe("Recruiter recommendation tier based on score"),
});

// 2. Schema for Top Pick executive summary
const topPickSummarySchema = z.object({
  topCandidateName: z.string().describe("The name of the winning candidate"),
  reasoning: z
    .string()
    .describe(
      "A 2-3 sentence executive explanation highlighting why this candidate was chosen as #1 over the others",
    ),
});

// 3. AI Service: Evaluate 1 Candidate
export const evaluateCandidateCV = async ({
  resume,
  jobDescription,
  selfDescription,
  fileName,
}: {
  resume: string;
  jobDescription: string;
  selfDescription?: string;
  fileName?: string;
}) => {
  const prompt = `You are an expert technical recruiter. Evaluate this individual candidate's resume strictly against the target Job Description and Recruiter Notes.

Fallback Candidate Name / Filename: "${fileName || "Unknown"}"

Candidate Resume Content:
"""
${resume}
"""

Target Job Description:
"""
${jobDescription}
"""

Recruiter Notes / Self Description:
"""
${selfDescription || "None provided"}
"""

Instructions:
- Extract the candidate's real name if present, otherwise use "${fileName || "Unknown"}".
- Score objectively between 0 and 100 based strictly on verified skills in the resume.
- List 3 to 5 real strengths and identify missing skill gaps.
- Choose "Strong Fit" (score 80+), "Potential Fit" (score 55-79), or "Not Recommended" (score < 55).`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(singleCandidateEvaluationSchema),
    },
  });

  return JSON.parse(response.text ?? "{}");
};

// 4. AI Service: Generate Final Top Pick Summary
export const generateComparisonSummary = async ({
  jobDescription,
  topCandidates,
}: {
  jobDescription: string;
  topCandidates: Array<{
    candidateName: string;
    matchScore: number;
    summary: string;
    keyStrengths: string[];
  }>;
}) => {
  const prompt = `You are a Lead Recruiter reviewing ranked candidate evaluations.
Job Description:
"""
${jobDescription}
"""

Ranked Candidates:
${JSON.stringify(topCandidates, null, 2)}

Provide the winning candidate's name and write a compelling 2-3 sentence executive summary explaining why they are the best fit among all evaluated candidates.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(topPickSummarySchema),
    },
  });

  return JSON.parse(response.text ?? "{}");
};
