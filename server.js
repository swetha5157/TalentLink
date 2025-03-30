import 'express-async-errors';
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from "cors";
import cloudinary from 'cloudinary';
//routers
import jobRouter from './routes/jobRoutes.js'
import userRouter from "./routes/userRoutes.js";
import authRouter from './routes/authRoutes.js'

//public
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


//mockaroo

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


const __dirname=dirname(fileURLToPath(import.meta.url));
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'));
}
app.use(express.static(path.resolve(__dirname,'./public')));

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin.startsWith("http://localhost:")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

//middleware
import errorHandlerMiddleware from './middleware/errorHandler.js';
import { authenticateUser } from './middleware/authHandler.js';
if(process.env.NODE_ENV==='development'){
app.use(morgan("dev"));
}
app.use(cookieParser());

app.use(express.json());

app.get('/test',(req,res)=>{
  res.json({msg:'test route'});
})

app.use("/jobs", authenticateUser,jobRouter);
app.use("/users",authenticateUser,userRouter);
app.use("/auth",authRouter);
//not found middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//error middleware
app.use(errorHandlerMiddleware);

const port=process.env.PORT||5200;
try{
  await mongoose.connect(process.env.MONGO_URL);
 app.listen(port, () => {
  console.log(`server running in ${port} and mongodb is connected`);
});
}catch(e){
  console.log(e);
  process.exit(1);
}




