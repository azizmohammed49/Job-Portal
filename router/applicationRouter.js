import { Router } from "express";
import { isAdmin, isCandidate, isLoggedIn } from "../middleware/auth.js";
import {
  applyForJob,
  appliedCandidates,
} from "../controllers/appController.js";
import upload from "../utils/upload.js";

const router = Router();

router.get("/candidates/:jobId", isLoggedIn, isAdmin, appliedCandidates);

router.post(
  "/apply/:jobId",
  isLoggedIn,
  isCandidate,
  upload.single("resume"),
  applyForJob
);
// router.get("/candidates/:jobId", isAdmin, appliedCandidates);

export default router;
