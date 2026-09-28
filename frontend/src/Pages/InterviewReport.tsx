import React, { useContext, useEffect, useState } from "react";
import { interviewContext } from "../Context/interviewContext";
import { useParams, Link } from "react-router-dom";
import {
  getInterviewReportByID,
  downloadTailoredCV,
  downloadInterviewReportPDF,
} from "../Api/interview.api";

const InterviewReport = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(interviewContext);

  if (!context) {
    throw new Error("Interview context issue");
  }

  const { detailsInfo, setDetailsInfo } = context;

  useEffect(() => {
    const fetchInterviewReport = async () => {
      if (!detailsInfo && id) {
        try {
          const response = await getInterviewReportByID(id);
          const reportData = response.data;
          setDetailsInfo(reportData);
        } catch (error) {
          console.log("Failed to fetch interviewReport by Id", error);
        }
      }
    };
    fetchInterviewReport();
  }, [id, detailsInfo, setDetailsInfo]);

  const [activeTab, setActiveTab] = useState<
    "technical" | "behavioral" | "roadmap"
  >("technical");

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = async () => {
    if (!id) return;
    try {
      setIsDownloading(true);
      const blobData = await downloadTailoredCV(id);

      const url = window.URL.createObjectURL(
        new Blob([blobData], { type: "application/pdf" }),
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Tailored_Resume_${id}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download CV:", error);
      alert("Could not generate CV. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const [isDownloadingReport, setIsDownloadingReport] = useState(false);

  const handleDownloadReport = async () => {
    if (!id) return;
    try {
      setIsDownloadingReport(true);
      const blobData = await downloadInterviewReportPDF(id);

      const url = window.URL.createObjectURL(
        new Blob([blobData], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Interview_Prep_Plan_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download report PDF:", error);
      alert("Could not download the interview guide. Please try again.");
    } finally {
      setIsDownloadingReport(false);
    }
  };

  const isInvalidResume = detailsInfo?.isValidResume === false;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
              Interview Preparation
            </h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Your personalized interview preparation report
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="break-words text-sm font-semibold text-gray-900">
              {detailsInfo?.title || "Backend Software Engineer"}
            </p>

            <p className="text-xs text-gray-500">
              {detailsInfo?.createdAt
                ? `Analyzed on ${new Date(detailsInfo.createdAt).toLocaleDateString()}`
                : "Report Summary"}
            </p>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-6 lg:grid-cols-12">
        {/* 1. TOP BANNER INSIDE PAGE (Only shown if resume was rejected) */}
        {isInvalidResume && (
          <div className="col-span-1 rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm sm:p-5 lg:col-span-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg text-red-600">
                  ⚠️
                </span>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-red-900">
                    Resume Verification Failed
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-red-700">
                    {detailsInfo?.rejectionReason ||
                      "The uploaded file does not appear to be a valid professional resume."}
                  </p>
                </div>
              </div>

              <Link
                to="/home"
                className="w-full shrink-0 rounded-lg bg-red-600 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-red-700 sm:w-auto"
              >
                Upload New Resume
              </Link>
            </div>
          </div>
        )}

        {/* LEFT SIDEBAR */}
        <aside className="col-span-1 lg:col-span-3">
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Preparation
            </p>

            {/* Technical */}
            <button
              onClick={() => setActiveTab("technical")}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left sm:px-4 ${
                activeTab === "technical" ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <span className="shrink-0 text-sm">▣</span>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Technical</p>

                <p className="text-xs text-gray-500">
                  {detailsInfo?.technicalQuestions?.length ?? 0} questions
                </p>
              </div>
            </button>

            {/* Behavioral */}
            <button
              onClick={() => setActiveTab("behavioral")}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left sm:px-4 ${
                activeTab === "behavioral" ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <span className="shrink-0 text-sm text-gray-500">◉</span>

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700">Behavioral</p>

                <p className="text-xs text-gray-400">
                  {detailsInfo?.behavioralQuestions?.length ?? 0} questions
                </p>
              </div>
            </button>

            {/* Roadmap */}
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition sm:px-4 ${
                activeTab === "roadmap" ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <span className="shrink-0 text-sm text-gray-500">□</span>

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700">Roadmap</p>

                <p className="text-xs text-gray-400">
                  {detailsInfo?.preparationPlan?.length ?? 0} day plan
                </p>
              </div>
            </button>

            <div className="mt-4 flex flex-col gap-2">
              {/* Tailored CV Download */}
              <button
                onClick={handleDownloadCV}
                disabled={isDownloading || isInvalidResume}
                className="w-full rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
              >
                {isDownloading ? "Generating CV..." : "Download Tailored CV"}
              </button>

              {/* Interview Prep Plan PDF Download */}
              <button
                onClick={handleDownloadReport}
                disabled={isDownloadingReport || isInvalidResume}
                className="w-full rounded-lg border border-indigo-600 bg-white px-4 py-2 text-xs font-semibold text-green-600 transition hover:bg-indigo-50 disabled:opacity-50"
              >
                {isDownloadingReport
                  ? "Generating Prep PDF..."
                  : "Download Prep Guide (PDF)"}
              </button>
            </div>
          </div>
        </aside>

        {/* 2. MAIN SECTION */}
        <section className="col-span-1 min-w-0 lg:col-span-6">
          {isInvalidResume ? (
            /* Card shown inside the main column when resume is invalid */
            <div className="rounded-xl border border-gray-200 bg-white p-5 text-center sm:p-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-bold text-gray-900">
                No Interview Questions Generated
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
                {detailsInfo?.rejectionReason ||
                  "The uploaded document is not a valid resume. AI questions and preparation roadmaps require a legitimate CV with work history or skills."}
              </p>

              <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-left text-xs text-gray-600">
                <p className="font-semibold text-gray-800">
                  What makes a valid resume?
                </p>

                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Contains work experience, projects, or education</li>
                  <li>Relevant technical or professional skill keywords</li>
                  <li>Standard resume document format (PDF)</li>
                </ul>
              </div>

              <Link
                to="/home"
                className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800"
              >
                Upload Valid Resume
              </Link>
            </div>
          ) : (
            /* Normal Valid Resume Questions Tabs */
            <>
              {/* TECHNICAL */}
              {activeTab === "technical" && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <div className="border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Technical Questions
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Questions designed to evaluate your technical readiness
                      for this role.
                    </p>
                  </div>

                  {detailsInfo?.technicalQuestions?.map((elem, id) => (
                    <div
                      key={id}
                      className="border-b border-gray-200 px-4 py-5 last:border-b-0 sm:px-6 sm:py-6"
                    >
                      {/* Question number + question */}
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                          {String(id + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Question
                          </p>

                          <h3 className="break-words text-sm font-semibold leading-6 text-gray-900">
                            {elem.question}
                          </h3>
                        </div>
                      </div>

                      {/* Question / Intention / Answer */}
                      <div className="mt-5 ml-0 space-y-4 sm:ml-10">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Intention
                          </p>

                          <p className="mt-1 break-words text-sm leading-6 text-gray-600">
                            {elem.intention}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Answer
                          </p>

                          <p className="mt-1 break-words whitespace-pre-wrap text-sm leading-6 text-gray-600">
                            {elem.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* BEHAVIORAL */}
              {activeTab === "behavioral" && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <div className="border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Behavioral Questions
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Questions to assess teamwork, problem solving, and
                      cultural fit.
                    </p>
                  </div>

                  {detailsInfo?.behavioralQuestions?.map((elem, id) => (
                    <div
                      key={id}
                      className="border-b border-gray-200 px-4 py-5 last:border-b-0 sm:px-6 sm:py-6"
                    >
                      {/* Question number + question */}
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                          {String(id + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Question
                          </p>

                          <h3 className="break-words text-sm font-semibold leading-6 text-gray-900">
                            {elem.question}
                          </h3>
                        </div>
                      </div>

                      {/* Question / Intention / Answer */}
                      <div className="mt-5 ml-0 space-y-4 sm:ml-10">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Intention
                          </p>

                          <p className="mt-1 break-words text-sm leading-6 text-gray-600">
                            {elem.intention}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Answer
                          </p>

                          <p className="mt-1 break-words whitespace-pre-wrap text-sm leading-6 text-gray-600">
                            {elem.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ROADMAP */}
              {activeTab === "roadmap" && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <div className="border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5">
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
                      className="border-b border-gray-200 px-4 py-5 last:border-b-0 sm:px-6"
                    >
                      <span className="inline-block rounded bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white">
                        Day {plan.day}
                      </span>

                      <h4 className="mt-2 break-words text-sm font-bold text-gray-900">
                        {plan.focus}
                      </h4>

                      <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-600">
                        {plan.tasks?.map((task, tIdx) => (
                          <li key={tIdx} className="break-words">
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* 3. RIGHT SIDEBAR */}
        <aside className="col-span-1 space-y-4 sm:space-y-5 lg:col-span-3">
          {/* Match Score */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold text-gray-900">Match Score</p>

            <div className="mt-5 text-center">
              <p
                className={`text-4xl font-bold sm:text-5xl ${
                  isInvalidResume
                    ? "text-red-500"
                    : (detailsInfo?.matchScore ?? 0) >= 80
                      ? "text-green-600"
                      : (detailsInfo?.matchScore ?? 0) >= 60
                        ? "text-yellow-600"
                        : "text-red-600"
                }`}
              >
                {detailsInfo?.matchScore ?? 0} %
              </p>

              <p className="mt-2 text-xs text-gray-500">
                {isInvalidResume ? "Resume Unverified" : "Overall job match"}
              </p>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-600">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isInvalidResume
                    ? "bg-red-500"
                    : (detailsInfo?.matchScore ?? 0) >= 80
                      ? "bg-green-600"
                      : (detailsInfo?.matchScore ?? 0) >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min(
                    Math.max(detailsInfo?.matchScore ?? 0, 0),
                    100,
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Skill Gaps */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-900">
                Skill Gaps
              </h3>

              <span className="shrink-0 text-xs text-gray-400">
                {detailsInfo?.skillGaps?.length ?? 0} gaps
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {detailsInfo?.skillGaps && detailsInfo.skillGaps.length > 0 ? (
                detailsInfo.skillGaps.map((elem, id) => (
                  <div
                    key={id}
                    className="rounded-lg border border-gray-200 p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 break-words text-xs font-medium text-gray-800">
                        {elem.skill}
                      </p>

                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          elem.severity?.toLowerCase() === "high"
                            ? "bg-red-100 text-red-700"
                            : elem.severity?.toLowerCase() === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {elem.severity}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs italic text-gray-400">
                  {isInvalidResume
                    ? "No skills could be evaluated."
                    : "No skill gaps found."}
                </p>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default InterviewReport;
