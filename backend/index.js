import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import Userroute from './routes/userroute.js';
import messageRoute from './routes/messageroute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT=process.env.PORT || 8080;
//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true,

};
app.use(cors(corsOption));
// routes
app.use("/api/v1/user", Userroute);
app.use("/api/v1/message",messageRoute);
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);

})

