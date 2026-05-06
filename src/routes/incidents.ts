import { Router } from "express";
import { incidents } from "../data.js";
import { HttpError } from "../middleware/errorHandler.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(incidents);
});

router.get("/:id", (request, response, next) => {
  const incident = incidents.find((entry) => entry.id === request.params.id);

  if (!incident) {
    next(new HttpError(404, `Incident not found: ${request.params.id}`));
    return;
  }

  response.json(incident);
});

export default router;
