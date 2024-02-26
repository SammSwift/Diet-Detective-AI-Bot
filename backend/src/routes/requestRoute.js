import getAIResponse from "../controllers/requestController.js";
import express from "express";

const router = express.Router();

router.post("/ai-bot", getAIResponse);

export default router;
