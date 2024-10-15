// middleware/adminAuthMiddleware.js
const authMiddleware = require('./authMiddleware');

function adminAuthMiddleware(req, res, next) {
  authMiddleware(req, res, () => {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
  });
}

module.exports = adminAuthMiddleware;
