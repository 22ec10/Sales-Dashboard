import express from 'express'
import {getdata , getdata2 , getdata3 ,getdata4} from '../controllers/productsControllers.js'
import { signup, signin, authMiddleware } from "../auth.js";
export const productsRouter = express.Router()
export const userRouter = express.Router()
productsRouter.get('/', getdata)
productsRouter.get('/electronics', getdata2)
productsRouter.get('/furniture', getdata3)
productsRouter.get('/clothing', getdata4)
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
productsRouter.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, this is protected.` });
});

