// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

enum LogLevels {
    INFO = "info",
    ERROR = "error",
}

const logger = winston.createLogger({
    level: LogLevels.INFO,
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        //
        new winston.transports.File({ filename: 'error.log', level: LogLevels.ERROR }),
        //
        // - Write all logs with importance level of `info` or higher to `combined.log`
        //   (i.e., fatal, error, warn, and info, but not trace)
        //
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console(),
    ],
});

app.get("/user", (req: Request, res: Response) => {
    logger.info("Hello world!")
    res.send("TODO: Get all users");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
