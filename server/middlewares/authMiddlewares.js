const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "You need to log in first" });
};

const ensureAdmin = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    (req.user.role_id === 2 || req.user.role_id === 3)
  ) {
    return next();
  }
  res.status(403).json({ message: "Access denied" });
};

const ensureAgent = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    (req.user.role_id === 2 || req.user.role_id === 3 || req.user.role_id === 1)
  ) {
    return next();
  }
  res.status(403).json({ message: "Access denied" });
};

module.exports = { ensureAuthenticated, ensureAdmin, ensureAgent };
