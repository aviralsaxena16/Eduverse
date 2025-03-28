import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import connectDB from './config/database.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'


const app = express();

app.use(cors({
  origin: ["https://eduversefrontend-l6l3.onrender.com"],
  methods: ['GET', 'POST', 'PUT'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
}));
app.use(cookieParser());
// Constants
app.use(express.json());


app.use('/home',userRoutes)
app.use('/',authRoutes)



const PORT=process.env.PORT || 4507; 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
  });
}).catch(err => console.log(err));