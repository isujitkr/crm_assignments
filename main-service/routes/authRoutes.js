import express from 'express';
import { check } from 'express-validator';
import { register, login, protectedRoute } from '../controllers/authController.js';
import authenticate from '../utils/authenticate.js';

const router = express.Router();

router.post('/register', [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], register);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], login);

router.post('/protected', authenticate, protectedRoute);

export default router;
