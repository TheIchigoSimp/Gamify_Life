import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

// Protected routes
authRoutes.get("/test", authMiddleware, (req, res) => {
    res.json({message: "Token verified", user: req.user});
});

export default authRoutes;