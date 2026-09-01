import dotenv from "dotenv";
import invokeGeminiAi from "./src/Services/ai.services.js";
import app from "./src/app";
import connectDB from "./src/Database/db";

dotenv.config();

connectDB();
console.log("Testinng ");

//invokeGeminiAi();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
