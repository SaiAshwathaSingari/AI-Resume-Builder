import express from "express"
import protect from "../middlewares/authMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/resumeController.js";
import upload from "../lib/multer.js";

const resumeRouter = express.Router();


resumeRouter.post('/create',protect,createResume);
resumeRouter.delete('/delete/:resumeId',protect,deleteResume);
resumeRouter.put('/update', upload.single('image'), protect,updateResume)
resumeRouter.get('/public/:resumeId',getPublicResumeById)
resumeRouter.get('/get/:resumeId',getResumeById);

export default resumeRouter;