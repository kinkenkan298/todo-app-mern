import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./db";
import { app } from "./server";

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

await connectDB();

const onCloseSignal = async () => {
  console.info("sigint received, shutting down");

  await mongoose.connection.close();
  console.info("Database connection closed");

  server.close(() => {
    console.log("Server closed");
  });
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
