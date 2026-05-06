import { Router } from "express";
import { z } from "zod";
import {
  analyzeEscalation,
  analyzeIncident,
  analyzePlaybook,
} from "../services/incidentService.js";

const router = Router();

const analysisSchema = z.object({
  serviceName: z.string().min(2),
  environment: z.enum(["production", "staging", "development"]),
  severitySignals: z.array(z.string().min(2)).min(1),
  minutesOpen: z.number().int().nonnegative(),
  affectedCustomers: z.number().int().nonnegative(),
  isRevenueImpacting: z.boolean(),
  primaryResponderAvailable: z.boolean(),
  executiveVisibility: z.boolean(),
});

router.post("/analyze/incident", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeIncident(input));
});

router.post("/analyze/escalation", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeEscalation(input));
});

router.post("/analyze/playbook", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzePlaybook(input));
});

export default router;
