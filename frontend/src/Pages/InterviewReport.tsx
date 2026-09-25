import React, { useContext, useEffect, useState } from "react";
import { interviewContext } from "../Context/interviewContext";
import { useParams } from "react-router-dom";
import { getInterviewReportByID } from "../Api/interview.api";
const InterviewReport = () => {
  const { id } = useParams<{ id: string }>();

  const context = useContext(interviewContext);

  console.log("InterviwReprotTest", context);

  if (!context) {
    throw new Error("Inteview context issue");
  }

  const { detailsInfo, setDetailsInfo } = context;

  useEffect(() => {
    const fetchInterviewReport = async () => {
      if (!detailsInfo && id) {
        try {
          const response = await getInterviewReportByID(id);
          const reportData = response.data;
          console.log("Last test", reportData);
          setDetailsInfo(reportData);
        } catch (error) {
          console.log("Failed to fetch interviewRpeot by Id", error);
        }
      }
    };
    fetchInterviewReport();
  }, [id, detailsInfo, setDetailsInfo]);

  const [activeTab, setActiveTab] = useState<
    "technical" | "behavioral" | "roadmap"
  >("technical");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Interview Preparation
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Your personalized interview preparation report
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {detailsInfo?.title || "Backend Software Engineer"}
            </p>

            <p className="text-xs text-gray-500">InnovateTech · Remote</p>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="mx-auto grid max-w-7xl grid-cols-12 gap-5 px-6 py-6">
        {/* LEFT SIDEBAR */}
        <aside className="col-span-3">
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Preparation
            </p>

            {/* Active */}
            <button
              onClick={() => setActiveTab("technical")}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg  px-4 py-3 text-left ${activeTab === "technical" ? "bg-gray-100" : "hover:bg-gray-50 "} `}
            >
              <span className="text-sm">▣</span>

              <div>
                <p className="text-sm font-semibold text-gray-900">Technical</p>

                <p className="text-xs text-gray-500">
                  {detailsInfo?.technicalQuestions?.length ?? 0} questions
                </p>
              </div>
            </button>

            {/* Behavioral */}
            <button
              onClick={() => setActiveTab("behavioral")}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left ${activeTab === "behavioral" ? "bg-gray-100" : "hover:bg-gray-50"} `}
            >
              <span className="text-sm text-gray-500">◉</span>

              <div>
                <p className="text-sm font-medium text-gray-700">Behavioral</p>

                <p className="text-xs text-gray-400">
                  {detailsInfo?.behavioralQuestions?.length ?? 0} questions
                </p>
              </div>
            </button>

            {/* Roadmap */}
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                activeTab === "roadmap" ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <span className="text-sm text-gray-500">□</span>

              <div>
                <p className="text-sm font-medium text-gray-700">Roadmap</p>

                <p className="text-xs text-gray-400">
                  {" "}
                  {detailsInfo?.preparationPlan?.length ?? 0}day plan
                </p>
              </div>
            </button>
          </div>
        </aside>

        {/* MAIN SECTION */}
        <section className="col-span-6">
          {activeTab === "technical" && (
            <div className="rounded-xl border border-gray-200 bg-white">
              {/* Section Header */}
              <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Technical Questions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Questions designed to evaluate your technical readiness for
                  this role.
                </p>
              </div>

              {detailsInfo?.technicalQuestions?.map((elem, id) => (
                <div key={id} className="border-b border-gray-200 px-6 py-6">
                  <div className="mb-3 flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                      {String(id + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-sm font-semibold leading-6 text-gray-900">
                      {elem.question}
                    </h3>
                  </div>

                  <div className="ml-10">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      What this evaluates
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {elem.intention}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {elem.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "behavioral" && (
            <div className="rounded-xl border border-gray-200 bg-white">
              {/* Section Header */}
              <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Behavioral Questions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Questions to assess teamwork, problem solving, and cultural
                  fit.
                </p>
              </div>

              {detailsInfo?.behavioralQuestions?.map((elem, id) => (
                <div key={id} className="border-b border-gray-200 px-6 py-6">
                  <div className="mb-3 flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                      {String(id + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-sm font-semibold leading-6 text-gray-900">
                      {elem.question}
                    </h3>
                  </div>

                  <div className="ml-10">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      What this evaluates
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {elem.intention}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {elem.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="rounded-xl border border-gray-200 bg-white">
              {/* Section Header */}
              <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Preparation Roadmap
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Daily plan tailored to cover your skill gaps.
                </p>
              </div>

              {detailsInfo?.preparationPlan?.map((plan) => (
                <div
                  key={plan.day}
                  className="border-b border-gray-200 px-6 py-5 last:border-b-0"
                >
                  <span className="inline-block rounded bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white">
                    Day {plan.day}
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-gray-900">
                    {plan.focus}
                  </h4>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-600">
                    {plan.tasks?.map((task, tIdx) => (
                      <li key={tIdx}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="col-span-3 space-y-5">
          {/* Match Score */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-semibold text-gray-900">Match Score</p>

            <div className="mt-5 text-center">
              <p className="text-5xl font-bold text-gray-900">
                {detailsInfo?.matchScore ?? 0} %
              </p>

              <p className="mt-2 text-xs text-gray-500">Overall job match</p>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-900 transition-all duration-500"
                style={{ width: `${detailsInfo?.matchScore ?? 0}%` }}
              ></div>
            </div>
          </div>

          {/* Skill Gaps */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                Skill Gaps
              </h3>

              <span className="text-xs text-gray-400">
                {detailsInfo?.skillGaps?.length ?? 0}gaps
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {detailsInfo?.skillGaps?.map((elem, id) => (
                <div key={id} className="rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-800">
                      {elem.skill}
                    </p>

                    <span className="text-[10px] font-semibold uppercase text-gray-500">
                      {elem.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default InterviewReport;
