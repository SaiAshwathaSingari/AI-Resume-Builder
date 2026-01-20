import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./lib/db.js";
import userRouter from "./Routes/UserRoutes.js";
import resumeRouter from "./Routes/ResumeRoutes.js";
import aiRouter from "./Routes/AiRoutes.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

/* ======================
   CORS CONFIG (SECURE)
====================== */
const allowedOrigins = [
  "http://localhost:5173",
  "https://cvision.vercel.app",
  "https://cvision-resume-builder.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / server calls
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

/* ======================
   MIDDLEWARES
====================== */
app.use(express.json());

/* ======================
   HEALTH CHECK (KEEP-ALIVE)
====================== */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

/* ======================
   ROUTES
====================== */
app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

/* ======================
   START SERVER
====================== */
const startServer = async () => {
  try {
    await connectDB();

    // IMPORTANT: do NOT bind to 127.0.0.1 in production
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
};

startServer();
