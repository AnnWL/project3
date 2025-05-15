import dotenv from "dotenv";
dotenv.config();
import express from "express";

import authRouter from "./src/routers/authRouter.js";
import actorRouter from "./src/routers/actorRouter.js";
//import crewRouter from "./src/routers/crewRouter.js";
import movieRouter from "./src/routers/movieRouter.js";
import userRouter from "./src/routers/userRouter.js";
import seedRouter from "./src/routers/seedRouter.js";

import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "./src/utils/error.js";

import connectDB from "./src/db/db.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();
const app = express();
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
//app.use("/api/crew", crewRouter);
app.use("/api/actors", actorRouter);

app.use((err, req, res, next) => {
  // If the error is a custom error (e.g., BadRequestError, NotFoundError)
  if (
    err instanceof BadRequestError ||
    err instanceof NotFoundError ||
    err instanceof ConflictError
  ) {
    return res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }

  // For any other error (unexpected or internal server error)
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
