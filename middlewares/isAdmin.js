export const isAdmin = (req, res, next) => {
    try {
        const admin = req.user && req.user.role === 1;
        if (admin) {
            return next(); 
        } else {
            res.status(401); 
            throw new Error("Access denied"); 
        }
    } catch (error) {
        next(error);
    }
};