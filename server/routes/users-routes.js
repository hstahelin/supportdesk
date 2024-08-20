const express = require("express");
const {
  ensureAuthenticated,
  ensureAdmin,
} = require("../middlewares/authMiddlewares");

const router = express.Router();
const usersController = require("../controllers/users-controller");

router.route("/").get(ensureAuthenticated, ensureAdmin, usersController.getAll);

module.exports = router;
