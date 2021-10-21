import { Router } from "express";
const router = Router();
import apiv1 from "./API";

// API Routes
router.use("/v1", apiv1);

export default router;
