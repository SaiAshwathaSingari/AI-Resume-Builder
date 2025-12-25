import express from "express";
import cors from "cors";
import "dotenv/config"

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;





app.listen(port,()=>{
  console.log(`Server is running on http://localhost:3000`)
})





