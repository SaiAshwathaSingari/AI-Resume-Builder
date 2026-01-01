import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import { enhanceJobDescription, uploadResumeToAi } from '../controllers/aiController.js';

const AiRouter = express.Router();

AiRouter.post('/enhance-pro-sum',protect,enhanceJobDescription)
AiRouter.post('/enhance-job-des',protect,enhanceJobDescription)

AiRouter.post('/upload-resume',protect,uploadResumeToAi);

export default AiRouter;