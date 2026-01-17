import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.json({ status: "Backend running"});
})

const PORT = process.env.PORT || 3000;

app.use("/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})