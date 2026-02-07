import { connect } from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    console.info("Connecting to MongoDB...");
    await connect(process.env.DATABASE_URI!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
