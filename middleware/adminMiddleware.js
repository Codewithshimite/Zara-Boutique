// Admin Middleware to check if the user is an admin
const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access not accespted, admin only" });
  }
  next(); // If the user is an admin, proceed
};


module.exports = adminMiddleware;


