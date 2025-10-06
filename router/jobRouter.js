import { Router } from "express";
import { isAdmin, isCandidate, isLoggedIn } from "../middleware/auth.js";
import { getAllJobs, addJob } from "../controllers/jobController.js";
const router = Router();

router.get("/allJobs/:page/:pageSize", isCandidate, getAllJobs);
router.get("/allJobs", getAllJobs);
router.post("/addJob", isLoggedIn, isAdmin, addJob);

export default router;
