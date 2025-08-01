import express from "express";
import cors from "cors";
import { db_connection } from "./config/dbConnection.js";
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';
import statsRoutes from './routes/stats.js';
import categoryRoutes from './routes/categoryRoutes.js';
import dotenv from 'dotenv';
const app = express();
// Connect to the database
db_connection();

// Enable CORS
app.use(cors());
dotenv.config();
// Parse incoming request bodies as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);        
app.use('/api/expenses', expenseRoutes);  
app.use('/api/stats', statsRoutes);       
app.use('/api/categories', categoryRoutes);

// Start the server
app.listen(5600, () => {
    console.log("Server is running on port 5600");
});
