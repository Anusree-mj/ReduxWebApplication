import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDb from './config/db.js';
dotenv.config();
const port = process.env.PORT || 5000;

connectDb();

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes)
app.use('/admin', adminRoutes);


app.get('/', (req, res) => res.send('Server is ready'))
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));