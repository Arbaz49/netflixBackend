
import "./config.js"
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { GlobalErrorHandler } from "./controllers/ErrorHandler.js";
import userRouter from "./routes/userRoutes.js";
import moviesRouter from "./routes/moviesRoutes.js";

console.log(process.env.JWT_EXPIRY)

// const tokenCreation=(id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET_KEY,{
//         expiresIn:process.enc.JWT_EXPIRY
//     })
// }

const app = express();
app.use(express.json());
app.use(cors())
const uri=process.env.MONGO_URI.replace("<username>",process.env.USERNAME).replace("<password>",process.env.PASSWORD);

mongoose.connect(uri).then((res)=>{
    console.log("connected to mongoDB");
}).catch((err)=>{
    console.log(err)
})

//routes
app.use("/api/v1/auth",userRouter);
app.use("/api/v1/movies",moviesRouter);

//error handling
app.use(GlobalErrorHandler);


const port=process.env.PORT || 7000
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})