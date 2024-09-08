const canAccessUser = (req, res, next) => {
  const userRole = req.user.role_id;
  const userId = req.user.user_id;
  const targetUserId = req.params.id;

  if (userRole === 1 || userRole === 2 || userRole === 3) {
    return next();
  } else if (userRole === 4 && userId == targetUserId) {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this user" });
  }
};

module.exports = { canAccessUser };
