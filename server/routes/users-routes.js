const express = require("express");
const {
  ensureAuthenticated,
  ensureAgent,
} = require("../middlewares/authMiddlewares");
const { canAccessUser } = require("../middlewares/userMiddlewares");
const usersController = require("../controllers/users-controller");
const router = express.Router();

router.route("/").get(ensureAuthenticated, ensureAgent, usersController.getAll);

router
  .route("/notifications")
  .get(ensureAuthenticated, usersController.getNotifications);

router
  .route("/:id")
  .get(ensureAuthenticated, canAccessUser, usersController.getOne)
  .post(ensureAuthenticated, canAccessUser, usersController.updateUser);

router
  .route("/:id/reportingUsers")
  .get(ensureAuthenticated, ensureAgent, usersController.getReportingUsers);

module.exports = router;
