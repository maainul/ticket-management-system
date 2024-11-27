import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./dbConnection.js";
import setupRoutes from "./appRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// configure env
dotenv.config();

// database config
connectDB();

// rest Object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pos.netlify.app"],
    credentials: true,
  })
);

// call routes
setupRoutes(app);

// Error-handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});

export default app;
