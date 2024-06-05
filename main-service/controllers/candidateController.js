import Candidate from '../models/Candidate.js';

// Add candidate
export const addCandidate = async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        const user_id = req.user.userId; 

        const newCandidate = new Candidate({ first_name, last_name, email, user_id });
        await newCandidate.save();

        res.status(201).json({ message: 'Candidate added successfully', candidate: newCandidate });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get candidates
export const getCandidates = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const candidates = await Candidate.find({ user_id });

        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
