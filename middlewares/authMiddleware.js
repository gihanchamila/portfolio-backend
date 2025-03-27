import { apiKey } from "../config/keys.js"


const authenticateAPIKey = (req, res, next) => {
    const requestApiKey = req.query.API_KEY || req.headers['api_key'];
    if (requestApiKey !== apiKey) {
        return res.status(403).json({ message: "Access denied. Invalid API key." });
    }
    next();
};

export default authenticateAPIKey;