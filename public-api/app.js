import express from 'express';
import mongoose from 'mongoose';
import publicRoutes from './routes/publicRoutes.js';
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
app.use('/api/public', publicRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Public API server is running on port ${PORT}`);
});
