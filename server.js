import 'express-async-errors';
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
//routers
import jobRouter from './routes/jobRoutes.js'
import userRouter from "./routes/userRoutes.js";

import authRouter from './routes/authRoutes.js'

//middleware
import errorHandlerMiddleware from './middleware/errorHandler.js';
import { authenticateUser } from './middleware/authHandler.js';
if(process.env.NODE_ENV==='development'){
app.use(morgan("dev"));
}
app.use(cookieParser());

app.use(express.json());
app.use("/jobs", authenticateUser,jobRouter);
app.use("/users",authenticateUser,userRouter);
app.use("/auth",authRouter);
//not found middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//error middleware
app.use(errorHandlerMiddleware);

const port=process.env.PORT||5100;
try{
  await mongoose.connect(process.env.MONGO_URL);
 app.listen(port, () => {
  console.log(`server running in ${port} and mongodb is connected`);
});

}catch(e){
  console.log(e);
  prcoess.exit(1);
}




