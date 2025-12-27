import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./lib/db.js";
import userRouter from "./Routes/UserRoutes.js";
import resumeRotuer from "./Routes/ResumeRoutes.js";

const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000;


connectDB();



app.use('/api/users',userRouter);
app.use('/api/resumes',resumeRotuer);
app.listen(port,()=>{
  console.log(`Server is running on http://localhost:3000`)
})





