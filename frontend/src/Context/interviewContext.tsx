import { createContext, useState } from "react";

export interface Question {
  question: string;
  intention: string;
  answer: string;
}

export type SeverityLevel = "low" | "medium" | "high";
export interface SkillGap {
  skill: string;
  severity: SeverityLevel;
}

export interface PreparationPlanDay {
  day: number;
  focus: string;
  tasks: string[];
  _id?: string;
}

export interface InterviewReportData {
  _id: string;
  title: string;

  matchScore: number;
  technicalQuestions: Question[];
  behavioralQuestions: Question[];
  skillGaps: SkillGap[];
  preparationPlan: PreparationPlanDay[];
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InterviewContextType {
  detailsInfo: InterviewReportData | null;
  setDetailsInfo: React.Dispatch<
    React.SetStateAction<InterviewReportData | null>
  >;
}

export const interviewContext = createContext<InterviewContextType | null>(
  null,
);

export const InterviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [detailsInfo, setDetailsInfo] = useState<InterviewReportData | null>(
    null,
  );

  return (
    <interviewContext.Provider value={{ detailsInfo, setDetailsInfo }}>
      {children}
    </interviewContext.Provider>
  );
};
