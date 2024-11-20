import { Router } from "express";
import TaskController from "../controller/TaskController.js";
import authMiddleware from "../middleware/Authmiddleware.js";

const router = Router();

router.get("/task", TaskController.index);
router.post("/task", authMiddleware, TaskController.store);

export default router;
