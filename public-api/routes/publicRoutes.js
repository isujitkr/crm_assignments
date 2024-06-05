import express from 'express';
import { getProfile, getCandidates } from '../controllers/publicController.js';
import authenticateApiKey from '../utils/authenticateApiKey.js';

const router = express.Router();

router.post('/profile', authenticateApiKey, getProfile);
router.get('/candidate', authenticateApiKey, getCandidates);

export default router;
