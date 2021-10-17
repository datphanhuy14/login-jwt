import { Router } from "express";
const router = Router();
import { test } from "../controllers";
import apiv1 from "./API";

/* Test routes. */
router.get("/test", test.friendLists);
router.get("/initdb", test.initDb);
// API Routes
router.use("/v1", apiv1);

export default router;
