import Candidate from "../models/Candidate.js";
// import Candidate from "../../main-service/models/Candidate.js";

// Get user profile
export const getProfile = (req, res) => {
    try {
        const { first_name, last_name, email } = req.user;
        res.json({ first_name, last_name, email });
    } catch (error) {
        console.error('Error in getProfile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get candidates
export const getCandidates = async (req, res) => {

    try {
        console.log('Fetching candidates for user:', req.user._id);
        const candidates = await Candidate.find({ user_id: req.user._id });
        res.json(candidates);
    } catch (error) {
        console.error('Error in getCandidates:', error);
        res.status(500).json({ message: 'Server Error' });
    }

};