export const BASE_URL =
  process.env.NODE_ENV === "develeopment"
    ? "http://localhost:5000"
    : "https://diet-detector-ai-bot.onrender.com";
export const AI_URL = "/api/ai_bot";
export const UPLOAD_URL = "/api/upload";
