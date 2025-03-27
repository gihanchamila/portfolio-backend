import { apiKey } from "../config/keys.js"


const authenticateAPIKey = (req, res, next) => {
    const api_Key = req.headers['x-api-key'];
    if (!api_Key || api_Key !== apiKey) {
        return res.status(403).json({ message: 'Access denied. Invalid API key.' });
    }
    next();
};

export default authenticateAPIKey;