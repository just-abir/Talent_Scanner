import dotenv from "dotenv";

import app from "./src/app";
import connectDB from "./src/Database/db";

dotenv.config();

connectDB();
console.log("Testinng ");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
