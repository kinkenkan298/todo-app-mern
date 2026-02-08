import { errorHandler } from "@/middleware/error-handler";
import { todoRoutes } from "@/routes/todo.routes";
import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api/todos", todoRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
