import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";

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

//API Route
app.get("/api/message", (req, res)=>{
    res.json({message: "Hello from server"})
});

const PORT = 4000
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
});