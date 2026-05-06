import { Router } from "express";
import { responders } from "../data.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(responders);
});

export default router;
