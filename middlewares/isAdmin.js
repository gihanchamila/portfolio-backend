// This is cheching Authorization
// Check for the role of admin
// For the admins, the user role is 1

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