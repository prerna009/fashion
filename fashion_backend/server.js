import express from "express";
import cors from "cors";
import dotenv  from "dotenv";
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));