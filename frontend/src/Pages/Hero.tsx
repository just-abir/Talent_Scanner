import React, { useState } from "react";
import { CheckCircle2, ArrowRight, Sparkles, ChevronRight } from "lucide-react";

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"candidate" | "recruiter">(
    "candidate",
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* 1. HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
              TS
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900">
              TalentScanner
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition">
              How it Works
            </a>
            <a href="#modes" className="hover:text-slate-900 transition">
              Solutions
            </a>
            <a href="#preview" className="hover:text-slate-900 transition">
              Dashboard Preview
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition"
            >
              Sign In
            </a>
            <a
              href="/home"
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition shadow-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="pt-20 pb-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>Dual Engine: Interview Prep & Bulk CV Ranking</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
            Match Resumes, Uncover Skill Gaps &{" "}
            <br className="hidden md:block" />
            <span className="text-slate-600 font-normal">
              Rank Candidates in Seconds
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
            Whether you are preparing for a specific job role or evaluating a
            batch of applicants, TalentScanner generates precise match scores,
            technical question guides, and candidate leaderboards.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-12">
            <a
              href="/home"
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg shadow-sm transition flex items-center justify-center gap-2 text-sm"
            >
              Generate Interview Report <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/compare"
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-300 transition text-sm"
            >
              Compare & Rank CVs
            </a>
          </div>

          {/* Clean Metric Strip */}
          <div className="pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
            <div className="p-3">
              <div className="text-2xl font-bold text-slate-900">88% +</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Scoring Accuracy
              </div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-slate-900">
                Technical Q&A
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                With evaluation insights
              </div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-slate-900">
                Skill Gap Tagging
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Medium & Low priority flags
              </div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-slate-900">
                Bulk Leaderboard
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Top candidate highlights
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DUAL WORKFLOW / FEATURE MODES */}
      <section id="modes" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Designed for Two Essential Workflows
            </h2>
            <p className="text-slate-600 text-sm">
              Select a workflow to see how TalentScanner operates for applicants
              and hiring managers.
            </p>
          </div>

          {/* Custom Tab Switcher */}
          <div className="flex justify-center mb-10">
            <div className="bg-slate-200/80 p-1 rounded-xl inline-flex gap-1">
              <button
                onClick={() => setActiveTab("candidate")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === "candidate"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                1. Single Candidate / Interview Prep
              </button>
              <button
                onClick={() => setActiveTab("recruiter")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === "recruiter"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                2. Bulk CV Compare & Rank
              </button>
            </div>
          </div>

          {/* TAB CONTENT 1: SINGLE CANDIDATE */}
          {activeTab === "candidate" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 space-y-4">
                <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Single Resume Mode
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  Personalized Interview Preparation Report
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Upload your CV alongside your target job description. The AI
                  instantly calculates your overall job match score, detects
                  critical skill limitations, and generates tailored technical &
                  behavioral interview questions.
                </p>

                <ul className="space-y-2.5 text-sm text-slate-700 pt-2">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Exact Match Score % Breakdown</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Identified Skill Gaps (Medium & Low severity)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Technical questions with "What this evaluates" guidance
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      7-Day interview preparation roadmap & PDF downloads
                    </span>
                  </li>
                </ul>

                <div className="pt-4">
                  <a
                    href="/home"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline"
                  >
                    Try Single CV Generator <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* UI Mockup Card */}
              <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">
                      Petroleum & Mining Engineer
                    </h4>
                    <p className="text-xs text-slate-500">
                      Analyzed on 9/28/2026
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-emerald-600">
                      88 %
                    </span>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Overall Match
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Technical Question Preview
                  </div>
                  <p className="text-xs font-semibold text-slate-800">
                    "Can you explain the process you use for conducting
                    root-cause analysis when there is unexpected well downtime?"
                  </p>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-100 text-[11px] text-slate-600">
                    <span className="font-semibold text-slate-700">
                      WHAT THIS EVALUATES:
                    </span>{" "}
                    Evaluates practical problem-solving methodology and
                    technical capability.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: RECRUITER BULK */}
          {activeTab === "recruiter" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 space-y-4">
                <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Recruiter Mode
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  Compare & Rank Multiple Candidate CVs
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Screen dozens of candidate resumes against your job
                  requirements and recruiter priorities. Get an automated
                  candidate leaderboard with top recommendations[cite: 8, 9].
                </p>

                <ul className="space-y-2.5 text-sm text-slate-700 pt-2">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Custom Recruiter Notes & Priority Weighting[cite: 8]
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Multi-PDF Batch Upload Dropzone[cite: 8]</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Highlighted "Top Recommendation" summary</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Side-by-side Key Strengths vs Missing Skill Gaps
                    </span>
                  </li>
                </ul>

                <div className="pt-4">
                  <a
                    href="/compare"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline"
                  >
                    Try Bulk Candidate Comparison{" "}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* UI Mockup Card */}
              <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                {/* Recommendation Banner */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Top Recommendation
                    </span>
                    <span className="font-bold text-slate-900 text-xs">
                      Sahedul Islam Rony
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Sahedul Islam Rony is the clear top choice due to extensive
                    expertise in TypeScript, Node.js, Express, and React[cite:
                    9].
                  </p>
                </div>

                {/* Ranked Result Card */}
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-[10px]">
                        #1
                      </span>
                      <span className="font-bold text-slate-900 text-sm">
                        Sahedul Islam Rony
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                        Strong Fit
                      </span>
                    </div>
                    <span className="font-bold text-emerald-600 text-sm">
                      88% Match
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 bg-slate-50 rounded border border-slate-100">
                      <span className="font-semibold text-slate-700 block mb-1">
                        KEY STRENGTHS
                      </span>
                      <p className="text-slate-600">
                        • Full-stack TypeScript & Next.js
                      </p>
                    </div>
                    <div className="p-2 bg-red-50/50 rounded border border-red-100">
                      <span className="font-semibold text-red-800 block mb-1">
                        IDENTIFIED GAPS
                      </span>
                      <p className="text-red-700">
                        • Missing Mongoose ODM details
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. RECENT ACTIVITY & RECORD LOOK (App Consistency) */}
      <section
        id="preview"
        className="py-16 bg-white border-t border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                Recent Analysis & History Preview
              </h2>
              <p className="text-slate-600 text-sm">
                Real reports generated across different technical roles.
              </p>
            </div>
            <a
              href="/home"
              className="text-xs font-semibold text-slate-900 hover:underline mt-2 md:mt-0"
            >
              View All Dashboards →
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition shadow-sm flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Petroleum & Mining Engineer
                </p>
                <p className="text-xs text-slate-400 mt-1">9/28/2026</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                88% Match
              </span>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition shadow-sm flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Backend Software Engineer
                </p>
                <p className="text-xs text-slate-400 mt-1">9/26/2026</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                75% Match
              </span>
            </div>

            {/* Card 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition shadow-sm flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Assistant Professor - Physics
                </p>
                <p className="text-xs text-slate-400 mt-1">9/26/2026</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-red-50 text-red-700 border border-red-200">
                15% Match
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Analyze Your Next Job Description or Batch of CVs?
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Create personalized interview reports or streamline your recruiter
            candidate shortlist with TalentScanner.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/home"
              className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-lg text-sm transition"
            >
              Start Free Analysis
            </a>
            <a
              href="/register"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 text-sm transition"
            >
              Create Account
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 TalentScanner. Built for candidates and recruiters.</p>
          <div className="flex gap-6">
            <a href="/home" className="hover:text-slate-900">
              Generator
            </a>
            <a href="/compare" className="hover:text-slate-900">
              Compare CVs
            </a>
            <a href="/login" className="hover:text-slate-900">
              Sign In
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
