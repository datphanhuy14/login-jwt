import { Router } from "express";
const router = Router();
import { test, user } from "../controllers";
import apiv1 from "./API";

/* Test routes. */
router.get("/test", test.friendLists);
router.get("/initdb", test.initDb);
router.get("/getAll", user.list2);
// API Routes
router.use("/v1", apiv1);

export default router;
