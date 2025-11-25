import express from "express";
import { createTask, getTasks, updateTask, deleteTask, toggleTaskCompletion } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const taskRoutes = express.Router()

// Protected Routes
taskRoutes.post("/", authMiddleware, createTask);
taskRoutes.get("/", authMiddleware, getTasks);
taskRoutes.put("/:id", authMiddleware, updateTask);
taskRoutes.delete("/:id", authMiddleware, deleteTask);
taskRoutes.put("/:id/toggle", authMiddleware, toggleTaskCompletion);

export default taskRoutes;