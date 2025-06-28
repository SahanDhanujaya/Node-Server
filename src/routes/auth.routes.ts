import { Router } from "express";
import { getUsers, userLoging, signup } from "../controllers/auth.controller";

const authRouter = Router();
authRouter.post('/signup',signup)
authRouter.get('/users',getUsers)
authRouter.post('/login',userLoging)

export default authRouter 