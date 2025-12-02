import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";


import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";   // ⭐ ADDED

dotenv.config();

const app = express();

/* -------------------------------------------------------
   ⭐ ABSOLUTE FIX FOR GITHUB CODESPACES CORS ISSUES
-------------------------------------------------------- */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"   // ⭐ ADDED AUTH HEADER
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Extra CORS safety
app.use(cors({ origin: "*" }));

// Body parser
app.use(express.json());

app.use("/api/auth", authRoutes);


/* -------------------------------------------------------
   Test Route
-------------------------------------------------------- */
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

/* -------------------------------------------------------
   API Routes
-------------------------------------------------------- */
app.use("/api/auth", authRoutes);   // ⭐ ADDED
app.use("/api/notes", noteRoutes);

/* -------------------------------------------------------
   MongoDB Connect
-------------------------------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

/* -------------------------------------------------------
   Start Server
-------------------------------------------------------- */
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
