import User from "../models/User.js";
// import User from "../../main-service/models/User.js";

const authenticateApiKey = async (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'];
        if (!apiKey) {
            return res.status(401).json({ message: 'API key missing' });
        }

        const user = await User.findOne({api_key: apiKey });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid API key' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default authenticateApiKey;
