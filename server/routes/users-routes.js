const express = require("express");
const {
  ensureAuthenticated,
  ensureAgent,
} = require("../middlewares/authMiddlewares");
const { canAccessUser } = require("../middlewares/userMiddlewares");
const usersController = require("../controllers/users-controller");
const router = express.Router();

router.route("/").get(ensureAgent, usersController.getAll);

router.route("/notifications").get(usersController.getNotifications);

router
  .route("/:id")
  .get(canAccessUser, usersController.getOne)
  .post(canAccessUser, usersController.updateUser);

router
  .route("/:id/reportingUsers")
  .get(ensureAgent, usersController.getReportingUsers);

module.exports = router;
