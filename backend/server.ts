import dotenv from "dotenv";
// import invokeGeminiAi, {
//   generateInterviewReport,
// } from "./src/Services/ai.services.js";
import app from "./src/app";
import connectDB from "./src/Database/db";

import { resume, selfDescription, jobDescription } from "./src/test-data.js";

dotenv.config();

connectDB();
console.log("Testinng ");

//invokeGeminiAi();

// generateInterviewReport({ resume, selfDescription, jobDescription });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
