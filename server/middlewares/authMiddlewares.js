const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "You need to log in first" });
};

const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role_id === 2) {
    return next();
  }
  res.status(403).json({ message: "Access denied" });
};

module.exports = { ensureAuthenticated, ensureAdmin };
