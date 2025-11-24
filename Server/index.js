import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174"

            //Add Prod URL
        ]
    }
));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

//API Route
app.get("/api/message", (req, res)=>{
    res.json({message: "Hello from server"})
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    
});