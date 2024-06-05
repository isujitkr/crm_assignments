import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Mongodb is connected');
})
    .catch((err) => {
        console.log(err)
    });

// Routes
app.use('/api', authRoutes);
app.use('/api', candidateRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
