import dotenv from "dotenv";
// import invokeGeminiAi, {
//   generateInterviewReport,
// } from "./src/Services/ai.services.js";
import app from "./src/app.js";
import connectDB from "./src/Database/db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT);
