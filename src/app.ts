import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import healthRouter from "./routes/health.js";
import servicesRouter from "./routes/services.js";
import incidentsRouter from "./routes/incidents.js";
import alertsRouter from "./routes/alerts.js";
import respondersRouter from "./routes/responders.js";
import playbooksRouter from "./routes/playbooks.js";
import dashboardRouter from "./routes/dashboard.js";
import analysisRouter from "./routes/analysis.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const docsPath = path.join(process.cwd(), "docs", "openapi.yaml");
const openApiDocument = yaml.load(
  fs.readFileSync(docsPath, "utf8"),
) as Parameters<typeof swaggerUi.setup>[0];

app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use("/health", healthRouter);
app.use("/api/services", servicesRouter);
app.use("/api/incidents", incidentsRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/responders", respondersRouter);
app.use("/api/playbooks", playbooksRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api", analysisRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
