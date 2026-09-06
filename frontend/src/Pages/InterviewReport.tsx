import React from "react";

const InterviewReport = () => {
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
              Backend Software Engineer
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
            <button className="mb-1 flex w-full items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-left">
              <span className="text-sm">▣</span>

              <div>
                <p className="text-sm font-semibold text-gray-900">Technical</p>

                <p className="text-xs text-gray-500">7 questions</p>
              </div>
            </button>

            {/* Behavioral */}
            <button className="mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-gray-50">
              <span className="text-sm text-gray-500">◉</span>

              <div>
                <p className="text-sm font-medium text-gray-700">Behavioral</p>

                <p className="text-xs text-gray-400">4 questions</p>
              </div>
            </button>

            {/* Roadmap */}
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-gray-50">
              <span className="text-sm text-gray-500">□</span>

              <div>
                <p className="text-sm font-medium text-gray-700">Roadmap</p>

                <p className="text-xs text-gray-400">7 day plan</p>
              </div>
            </button>
          </div>
        </aside>

        {/* MAIN SECTION */}
        <section className="col-span-6">
          <div className="rounded-xl border border-gray-200 bg-white">
            {/* Section Header */}
            <div className="border-b border-gray-200 px-6 py-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Technical Questions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Questions designed to evaluate your technical readiness for this
                role.
              </p>
            </div>

            {/* Question 1 */}
            <div className="border-b border-gray-200 px-6 py-6">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                  01
                </span>

                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  How do you implement connection pooling and handle connection
                  failures in a Node.js application using PostgreSQL?
                </h3>
              </div>

              <div className="ml-10">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  What this evaluates
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Backend architectural knowledge and database management skills
                  required for the role.
                </p>
              </div>
            </div>

            {/* Question 2 */}
            <div className="border-b border-gray-200 px-6 py-6">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                  02
                </span>

                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Can you explain how the event loop in Node.js handles
                  asynchronous operations and phases?
                </h3>
              </div>

              <div className="ml-10">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  What this evaluates
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Core understanding of Node.js asynchronous programming.
                </p>
              </div>
            </div>

            {/* Question 3 */}
            <div className="px-6 py-6">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                  03
                </span>

                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  What strategies do you use to secure RESTful APIs against
                  common vulnerabilities?
                </h3>
              </div>

              <div className="ml-10">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  What this evaluates
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Authentication, authorization, and API security practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="col-span-3 space-y-5">
          {/* Match Score */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-semibold text-gray-900">Match Score</p>

            <div className="mt-5 text-center">
              <p className="text-5xl font-bold text-gray-900">20%</p>

              <p className="mt-2 text-xs text-gray-500">Overall job match</p>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[20%] rounded-full bg-gray-900"></div>
            </div>
          </div>

          {/* Skill Gaps */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                Skill Gaps
              </h3>

              <span className="text-xs text-gray-400">5 gaps</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-800">
                    Professional Backend Experience
                  </p>

                  <span className="text-[10px] font-semibold uppercase text-gray-500">
                    High
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-800">
                    Docker & Containerization
                  </p>

                  <span className="text-[10px] font-semibold uppercase text-gray-500">
                    High
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-800">
                    Redis Caching
                  </p>

                  <span className="text-[10px] font-semibold uppercase text-gray-500">
                    Medium
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-800">
                    Cloud Platforms
                  </p>

                  <span className="text-[10px] font-semibold uppercase text-gray-500">
                    Medium
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-800">
                    CI/CD Pipelines
                  </p>

                  <span className="text-[10px] font-semibold uppercase text-gray-500">
                    Medium
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default InterviewReport;
