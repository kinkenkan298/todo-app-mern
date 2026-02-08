import express from "express";
import cors from "cors";
import { errorHandler } from "@/middleware/error-handler";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
