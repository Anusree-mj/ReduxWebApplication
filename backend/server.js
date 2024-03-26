import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDb from './config/db.js';
import { fileURLToPath } from 'url'; 
import path from 'path';

const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename);

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
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes)
app.use('/admin', adminRoutes);


app.get('/', (req, res) => res.send('Server is ready'))
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));