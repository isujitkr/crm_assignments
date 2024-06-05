import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Register
export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const api_key = crypto.randomBytes(16).toString('hex');

    const user = new User({ first_name, last_name, email, password_hash, api_key });

    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully', api_key: user.api_key });
    } catch (error) {
        // Check if the error is a duplicate key error (11000)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        next(error);
    }
};

// Login
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    res.json({ token });
};

// Protected
export const protectedRoute = (req, res) => {
    res.json({ message: 'Protected route accessed' });
};
