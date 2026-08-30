import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const connection: string | undefined = process.env.MONGO_URI;
  if (!connection) {
    console.error("MONGO_URI is not defined in .env file");
    process.exit(1);
  }
  try {
    const response = await mongoose.connect(connection);
    console.log("Mongodb connected: ");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Database Connection Failed:", error.message);
    } else {
      console.error("Database Connection Failed:", error);
    }
    process.exit(1);
  }
};
export default connectDB;
