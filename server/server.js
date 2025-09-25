import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import { productsRouter , userRouter } from './routes/product.js'
const app=express();
dotenv.config()
const PORT=process.env.PORT  || 4000;
app.use(express.static('src'))
app.use(express.json()); 
app.use(cors())
app.use('/dashboard', productsRouter)
app.use('/', userRouter)
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
}).on("error", (err)=>{
    console.error('Failed to start server:' , err)
});