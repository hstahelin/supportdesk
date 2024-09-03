const express = require("express");
const {
  ensureAuthenticated,
  ensureAdmin,
} = require("../middlewares/authMiddlewares");

const router = express.Router();
const usersController = require("../controllers/users-controller");

router.route("/").get(ensureAuthenticated, ensureAdmin, usersController.getAll);
// router.route("/").get(ensureAuthenticated, usersController.getAll);
// router.route("/").get(usersController.getAll);
router
  .route("/:id")
  .get(ensureAuthenticated, usersController.getReportingUsers);
router
  .route("/:id/notifications")
  .get(ensureAuthenticated, usersController.getNotifications);
module.exports = router;
