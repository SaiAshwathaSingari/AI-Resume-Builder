
import express from 'express'

import protect from '../middlewares/authMiddleware.js'
import { getUserById, Login, registerUser } from '../controllers/userController.js';



const userRouter = express.Router();

userRouter.post('/register',registerUser);

userRouter.post('/login',Login);


userRouter.get('/data',protect,getUserById);

export default userRouter;
