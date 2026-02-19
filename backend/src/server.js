import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"

dotenv.config({ path: "./.env" });
console.log("ENV CHECK:", {
  PORT: process.env.PORT,
  DOMAIN: process.env.DOMAIN,
  SIWE_URI: process.env.SIWE_URI
});

const app = express();

app.use(cors( {
    origin: "http://localhost:5500",
    credentials: true
}
));

app.use(express.json());
app.use("/auth", authRoutes)

app.get("/", (req, res) => {

    res.json({ status: "Backend running"});
})

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})