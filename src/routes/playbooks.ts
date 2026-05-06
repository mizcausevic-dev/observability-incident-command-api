import { Router } from "express";
import { playbooks } from "../data.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(playbooks);
});

export default router;
