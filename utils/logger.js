import bunyan from "bunyan";
import path from "path";
import bunyanMongoDB from "bunyan-mongodb-logger";

const appLoggerFilePath = path.join(process.cwd(), "logs", "app.log");

export const appLogger = bunyan.createLogger({
  name: "job-portal-app-Logger",
  streams: [
    {
      level: "info",
      stream: process.stdout, // <-- corrected here
    },
    {
      level: "error",
      path: appLoggerFilePath,
    },
  ],
});

export const dbLogger = bunyanMongoDB({
  name: "job-portal-db-Logger",
  streams: ["stdout", "mongodb"],
  url: process.env.MONGO_URI,
  level: "info", // <-- changed from array to string
  collection: "jobportallogs",
});
