import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import streamRouter from "./routes/stream";

const app: Application = express();

app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.use("/stream", streamRouter);

const PORT: string | number = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}]`);
});
