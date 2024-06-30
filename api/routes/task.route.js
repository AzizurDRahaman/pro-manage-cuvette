import express from "express";
import { createTask, deleteTask, getTaskById, getUserTasks, updateTask } from "../controllers/task.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.post("/create-task", verifyAuth, createTask);
router.post("/update-task/:id", verifyAuth, updateTask);
router.delete("/delete-task/:id", verifyAuth, deleteTask);
router.get("/get-tasks/", verifyAuth, getUserTasks);
router.get("/get-task/:id", getTaskById);


export default router