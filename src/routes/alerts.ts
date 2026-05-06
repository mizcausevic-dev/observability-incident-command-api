import { Router } from "express";
import { alerts } from "../data.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(alerts);
});

export default router;
