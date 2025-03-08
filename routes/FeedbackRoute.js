import express from "express";

import { createFeedback, getFeedback } from "../controllers/FeedbackControllers.js";
const router = express.Router();

router.get("/page/Feedback", getFeedback);
router.post("/api/Feedback", createFeedback);

export default router;
