import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./lib/db.js";
import userRouter from "./Routes/UserRoutes.js";
import resumeRouter from "./Routes/ResumeRoutes.js";
import aiRouter from "./Routes/AiRoutes.js";

const app = express();
const PORT = Number(process.env.PORT) ||  3000;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

//start server
const startServer = async () => {
  try {
    await connectDB(); 

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
  }
};

startServer();
