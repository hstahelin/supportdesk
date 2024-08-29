const express = require("express");
const {
  ensureAuthenticated,
  ensureAdmin,
} = require("../middlewares/authMiddlewares");

const router = express.Router();
const usersController = require("../controllers/users-controller");

// router.route("/").get(ensureAuthenticated, ensureAdmin, usersController.getAll);
router.route("/").get(usersController.getAll);
router.route("/:id").get(usersController.getReportingUsers);
module.exports = router;
