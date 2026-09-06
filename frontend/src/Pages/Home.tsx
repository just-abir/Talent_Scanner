import React from "react";

const Home = () => {
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
                placeholder="Paste the target job description here..."
                className="h-[430px] w-full resize-none rounded-lg border border-gray-300 p-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-500"
              />
            </div>

            {/* Right Side */}
            <div className="p-7">
              {/* Upload Resume */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Upload Resume
                </label>

                {/* Upload Box */}
                <label
                  htmlFor="resume"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-5 py-8 text-center hover:bg-gray-50"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-lg text-gray-600">
                    ↑
                  </div>

                  <p className="text-sm font-medium text-gray-800">
                    Choose your resume
                  </p>

                  <p className="mt-1 text-xs text-gray-400">PDF files only</p>
                </label>

                {/* File Input */}
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                />
              </div>

              {/* Self Description */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Self Description
                </label>

                <textarea
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
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800">
                Generate Interview Report
                <span className="text-base">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
