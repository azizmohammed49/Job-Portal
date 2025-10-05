import express from "express";
import connectDB from "./db.js";
import useRouter from "./router/userRouter.js";
import { authenticate } from "./middleware/auth.js";
import fs from "fs";
import path from "path";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 8080;

const logDirectory = path.join(process.cwd(), "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const uplodadDirectory = path.join(process.cwd(), "uploads");
fs.existsSync(uplodadDirectory) || fs.mkdirSync(uplodadDirectory);

const requestLogPath = path.join(process.cwd(), "logs", "request.log");
const accessLogStream = fs.createWriteStream(requestLogPath, { flags: "a" });

app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

// Connect to MongoDB
connectDB;

app.use(express.json());

app.use("/", authenticate, useRouter);
app.use("/files", express.static(path.join(process.cwd(), "uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
