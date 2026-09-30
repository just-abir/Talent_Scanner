import { useEffect, useState } from "react";
import { getRecentReport, uploadInformation } from "../Api/interview.api";
import { useNavigate } from "react-router-dom";
import {
  interviewContext,
  type InterviewReportData,
} from "../Context/interviewContext";
import { useContext } from "react";

export type UploadForm = {
  resume: File;
  jobDescription: string;
  selfDescription: string;
};

const Home = () => {
  const { setDetailsInfo } = useContext(interviewContext)!;
  const navigate = useNavigate();
  const [resume, setResume] = useState<File | null>(null);

  const [jobDescription, setJobDescription] = useState<string>("");

  const [selfDescription, setSelfDescription] = useState<string>("");
  const [recentValue, setRecentValue] = useState<InterviewReportData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    if (!resume) {
      alert("Please upload your resume");
      return;
    }
    setLoading(true);
    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    try {
      const response = await uploadInformation(formData);

      setDetailsInfo(response.data);
      navigate(`/interview/${response.data._id}`);
    } catch (error) {
      console.log("eror interview", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const recentReportShow = async () => {
      try {
        const response = await getRecentReport();

        const result = response.data;

        setRecentValue(result || []);
      } catch (error) {
        console.log("recentshow error", error);
      }
    };
    recentReportShow();
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Resume & Interview Generator
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Create a personalized interview report using your resume, target
              job description, and self description.
            </p>
          </div>

          {/* Main Section */}
          <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white lg:grid-cols-2">
            {/* Left Side */}
            <div className="border-b border-gray-200 p-7 lg:border-b-0 lg:border-r">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Target Job Description
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Paste the job description you are applying for.
                </p>
              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                name="jobDescription"
                placeholder="Paste the target job description here..."
                className="h-[430px] w-full resize-none rounded-lg border border-gray-300 p-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-500"
              />
            </div>

            {/* Right Side */}
            <div className="p-7">
              {/* Upload Resume Section */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-900">
                    Upload Resume
                  </label>
                  {/* File Count Label (Jokhsn file thakbe) */}
                  {resume && (
                    <span className="text-xs font-medium text-gray-500">
                      1 file
                    </span>
                  )}
                </div>

                {!resume ? (
                  /* 1. NO FILE SELECTED: SHOW UPLOAD DROPZONE */
                  <label
                    htmlFor="resume"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-5 py-8 text-center hover:bg-gray-50 transition"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M12 16V4m0 0L7 9m5-5 5 5M5 20h14"
                        />
                      </svg>
                    </div>

                    <p className="text-sm font-medium text-gray-800">
                      Choose your resume
                    </p>

                    <p className="mt-1 text-xs text-gray-400">PDF files only</p>
                  </label>
                ) : (
                  /* 2. FILE SELECTED: SHOW PREVIEW CARD WITH X SIGN */
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                      {/* File Extension Badge (PDF/PNG/JPG) */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black text-[11px] font-bold text-white uppercase">
                        {resume.name.split(".").pop() || "PDF"}
                      </div>

                      {/* File Name & Size */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {resume.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {resume.size < 1024 * 1024
                            ? `${(resume.size / 1024).toFixed(1)} KB`
                            : `${(resume.size / (1024 * 1024)).toFixed(2)} MB`}
                        </p>
                      </div>
                    </div>

                    {/* Remove / Cross (X) Button */}
                    <button
                      type="button"
                      onClick={() => setResume(null)}
                      className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
                      title="Remove file"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  name="resume"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setResume(file);
                  }}
                  id="resume"
                  type="file"
                  accept=".pdf,application/pdf,image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                />
                <p className="mt-1.5 text-xs text-gray-400">
                  PDF, PNG, JPG, or WEBP
                </p>
              </div>

              {/* Self Description */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Self Description
                </label>

                <textarea
                  name="selfDescription"
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Tell us about yourself, your skills, experience, goals, and strengths..."
                  className="h-40 w-full resize-none rounded-lg border border-gray-300 p-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-500"
                />
              </div>

              {/* Required Info */}
              <div className="mb-6 flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-400 text-xs text-gray-600">
                  i
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Required information
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Resume and self description are required to generate the
                    interview report.
                  </p>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition ${
                  loading
                    ? "bg-gray-700 cursor-not-allowed opacity-90"
                    : "bg-gray-900 hover:bg-gray-800 cursor-pointer"
                }`}
              >
                {loading ? (
                  <span>Generating report....</span>
                ) : (
                  <>
                    <span>Generate Interview Report</span>
                    <span className="text-base">→</span>
                  </>
                )}
              </button>
            </div>

            <div className="col-span-1 border-t border-gray-200 p-7 lg:col-span-2">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Interviews
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View your recently generated interview reports.
                </p>
              </div>

              {recentValue.length === 0 ? (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                  <p className="text-sm text-gray-500">
                    No recent interview reports found.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {recentValue.map((elem) => (
                    <div
                      key={elem._id}
                      onClick={() => {
                        navigate(`/interview/${elem._id}`);
                      }}
                      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 transition hover:border-gray-400 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {elem.title ?? "Untitled Interview"}
                        </p>

                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            (elem.matchScore ?? 0) >= 80
                              ? "bg-green-100 text-green-700"
                              : (elem.matchScore ?? 0) >= 60
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {elem.matchScore ?? 0}% Match
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        {elem.createdAt
                          ? new Date(elem.createdAt).toLocaleDateString()
                          : "No date"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
