import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getComparisonByID } from "../Api/comparison.api";

interface Candidate {
  candidateName: string;
  rank: number;
  matchScore: number;
  summary: string;
  keyStrengths: string[];
  skillGaps: string[];
  recommendationTier: "Strong Fit" | "Potential Fit" | "Not Recommended";
}

interface ComparisonData {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  topPick: {
    candidateName: string;
    summary: string;
  };
  totalCandidates: number;
  candidates: Candidate[];
  createdAt: string;
}

const CompareReport = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getComparisonByID(id)
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load comparison.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading comparison report...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
        {error || "Comparison report not found."}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-600 font-bold">
            Candidate Leaderboard
          </span>

          <h1 className="text-3xl font-extrabold text-gray-900 mt-1">
            {data.jobTitle}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Evaluated {data.totalCandidates} candidates on{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>

        <Link
          to="/compare"
          className="px-4 py-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          + New Comparison
        </Link>
      </div>

      {/* Top Pick Executive Summary Card */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full uppercase">
            Top Recommendation
          </span>

          <h2 className="text-xl font-bold text-gray-900">
            {data.topPick.candidateName}
          </h2>
        </div>

        <p className="mt-3 text-gray-700 text-sm leading-relaxed">
          {data.topPick.summary}
        </p>
      </div>

      {/* Ranked Candidates Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Ranked Results</h2>

        {data.candidates.map((cand) => (
          <div
            key={cand.rank}
            className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition space-y-4"
          >
            {/* Candidate Header */}
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    cand.rank === 1
                      ? "bg-amber-400 text-amber-950 font-black"
                      : cand.rank === 2
                        ? "bg-slate-300 text-slate-800"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  #{cand.rank}
                </span>

                <h3 className="text-xl font-bold text-gray-900">
                  {cand.candidateName}
                </h3>

                <span
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                    cand.recommendationTier === "Strong Fit"
                      ? "bg-green-100 text-green-800"
                      : cand.recommendationTier === "Potential Fit"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {cand.recommendationTier}
                </span>
              </div>

              {/* Match Score Badge */}
              <div className="text-right">
                <span
                  className={`text-2xl font-black ${
                    cand.recommendationTier === "Strong Fit"
                      ? "text-green-600"
                      : cand.recommendationTier === "Potential Fit"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {cand.matchScore}%
                </span>

                <span className="text-xs text-gray-500 block">Match Score</span>
              </div>
            </div>

            {/* Score Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  cand.recommendationTier === "Strong Fit"
                    ? "bg-green-600"
                    : cand.recommendationTier === "Potential Fit"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${cand.matchScore}%` }}
              />
            </div>

            {/* Candidate Summary */}
            <p className="text-sm text-gray-600">{cand.summary}</p>

            {/* Strengths & Missing Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Strengths */}
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-2">
                  Key Strengths
                </h4>

                <ul className="list-disc list-inside space-y-1 text-sm text-emerald-900">
                  {cand.keyStrengths?.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wide mb-2">
                  Identified Gaps / Missing Skills
                </h4>

                <ul className="list-disc list-inside space-y-1 text-sm text-rose-900">
                  {cand.skillGaps?.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareReport;
