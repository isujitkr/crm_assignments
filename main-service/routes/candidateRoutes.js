import express from 'express';
import { addCandidate, getCandidates } from '../controllers/candidateController.js';
import authenticate from '../utils/authenticate.js';

const router = express.Router();

router.post('/candidate', authenticate, addCandidate);
router.get('/candidate', authenticate, getCandidates);

export default router;
