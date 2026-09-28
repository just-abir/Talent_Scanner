import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadComparison, getComparisonHistory } from "../Api/comparison.api";
const Compare = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getComparisonHistory();

        if (res.success) {
          setHistory(res.data || []);
        }
      } catch (err) {
        console.error("Failed to load comparison history", err);
      }
    };

    fetchHistory();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      setFiles((prevFiles) => {
        const existingNames = new Set(prevFiles.map((file) => file.name));

        const newFiles = selectedFiles.filter(
          (file) => !existingNames.has(file.name),
        );

        return [...prevFiles, ...newFiles];
      });

      // Allow selecting the same file again after removing it
      e.target.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length < 2) {
      setError("Please select at least 2 CVs (PDF) to compare.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    files.forEach((file) => {
      formData.append("resumes", file);
    });

    try {
      const res = await uploadComparison(formData);

      if (res.success && res.data?._id) {
        navigate(`/compare/${res.data._id}`);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to compare CVs. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3">
            Candidate Evaluation
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Compare & Rank CVs
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600 leading-relaxed">
            Define your hiring requirements, add recruiter priorities, and
            upload candidate resumes. The candidates will be evaluated against
            your requirements before the analysis begins.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 border border-black bg-gray-50 px-4 py-3 text-sm">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT SIDE */}
            <div className="border border-gray-200 rounded-2xl p-7">
              <div className="mb-7">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-white text-xs font-bold">
                    01
                  </span>

                  <h2 className="text-lg font-semibold">Target Job</h2>
                </div>

                <p className="text-sm text-gray-500 ml-10">
                  Define the role and requirements you want candidates evaluated
                  against.
                </p>
              </div>

              {/* Job Title */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Job Title <span className="text-gray-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Full-Stack Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm outline-none transition focus:border-black"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Target Job Description{" "}
                  <span className="text-gray-500">*</span>
                </label>

                <textarea
                  required
                  rows={14}
                  placeholder="Paste the core requirements, responsibilities, expected technical stack, experience, qualifications, and other important criteria..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm leading-relaxed outline-none resize-none transition focus:border-black"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Candidates will be evaluated against this description.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="border border-gray-200 rounded-2xl p-7">
              {/* Recruiter Notes */}
              <div className="mb-8">
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-white text-xs font-bold">
                      02
                    </span>

                    <h2 className="text-lg font-semibold">Recruiter Notes</h2>
                  </div>

                  <p className="text-sm text-gray-500 ml-10">
                    Add priorities or things the AI should pay extra attention
                    to.
                  </p>
                </div>

                <label className="block text-sm font-semibold mb-2">
                  Recruiter Notes / Priorities{" "}
                  <span className="font-normal text-gray-400">(Optional)</span>
                </label>

                <textarea
                  rows={4}
                  placeholder="e.g. Prioritize strong Docker and AWS experience over total years."
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm leading-relaxed outline-none resize-none transition focus:border-black"
                />
              </div>

              {/* Upload */}
              <div>
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-white text-xs font-bold">
                      03
                    </span>

                    <h2 className="text-lg font-semibold">Candidate CVs</h2>
                  </div>

                  <p className="text-sm text-gray-500 ml-10">
                    Upload at least two PDF resumes to start the comparison.
                  </p>
                </div>

                <label
                  htmlFor="resume-upload"
                  className="group flex flex-col items-center justify-center min-h-[190px] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-black transition"
                >
                  <div className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center mb-4 group-hover:border-black transition">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M12 16V4" />
                      <path d="M7 9l5-5 5 5" />
                      <path d="M5 20h14" />
                    </svg>
                  </div>

                  <p className="text-sm font-semibold">
                    Upload candidate resumes
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    PDF files only · Minimum 2 candidates
                  </p>
                  <p className="mt-1 text-xs text-red-600">
                    This may take a few moments
                  </p>

                  <input
                    id="resume-upload"
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {/* Selected Files */}
                {files.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold">
                        Selected candidates
                      </p>

                      <span className="text-xs text-gray-500">
                        {files.length} {files.length === 1 ? "file" : "files"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {files.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3"
                        >
                          <div className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center text-[10px] font-bold">
                            PDF
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">
                              {f.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              {(f.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>

                          {/* Remove file */}
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(i)}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-red-600"
                            aria-label={`Remove ${f.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Before Analysis */}
          <div className="mt-6 border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="text-sm font-semibold mb-1">Ready to analyze?</p>

                <p className="text-sm text-gray-500">
                  Make sure your job requirements and candidate CVs are ready
                  before starting the AI comparison.
                </p>
                <p className="mt-2 text-xs text-amber-600">
                  AI analysis may take a few moments depending on the number of
                  candidates. Please keep this page open.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`shrink-0 px-7 py-3 rounded-lg text-sm font-semibold transition ${
                  loading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800 cursor-pointer"
                }`}
              >
                {loading ? "Analyzing and Ranking..." : "Run AI Comparison"}
              </button>
            </div>
          </div>
        </form>
        {history.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Comparisons
                </h2>

                <p className="text-sm text-gray-500">
                  Your previous CV comparison analyses
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {history.slice(0, 10).map((comparison) => (
                <button
                  key={comparison._id}
                  type="button"
                  onClick={() => navigate(`/compare/${comparison._id}`)}
                  className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-black transition text-left"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {comparison.jobTitle}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {comparison.totalCandidates} candidates
                      {" · "}
                      {new Date(comparison.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold ">
                      Selected:{" "}
                      <span className="text-green-600">
                        {" "}
                        {comparison.topPick?.candidateName ??
                          "Top Candidate"}{" "}
                      </span>
                    </p>

                    <p className="text-[11px] text-center font-medium">View </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
