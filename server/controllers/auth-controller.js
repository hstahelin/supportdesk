const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ userId });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred during login." });
    }
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Login failed." });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log in user." });
      }
      const sanitizedUser = {
        user_id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: user.role_id,
        manager_user_id: user.manager_user_id,
      };
      return res.json({ message: "Login successful", user: sanitizedUser });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Session destruction failed" });
      }
      res.clearCookie("connect.sid", { path: "/" }); // Replace 'connect.sid' with your session cookie name if different
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};

module.exports = { register, login, logout };
