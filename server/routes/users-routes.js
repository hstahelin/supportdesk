const express = require("express");
const {
  ensureAuthenticated,
  ensureAdmin,
  ensureAgent,
} = require("../middlewares/authMiddlewares");
const { canAccessUser } = require("../middlewares/userMiddlewares");
const usersController = require("../controllers/users-controller");
const router = express.Router();

router.route("/").get(ensureAuthenticated, ensureAgent, usersController.getAll);

// router.route("/:id").get(ensureAuthenticated, usersController.getOne);
router
  .route("/:id")
  .get(ensureAuthenticated, canAccessUser, usersController.getOne)
  .post(ensureAuthenticated, canAccessUser, usersController.updateUser);

router
  .route("/:id/reportingUsers")
  .get(ensureAuthenticated, ensureAgent, usersController.getReportingUsers);

router
  .route("/:id/notifications")
  .get(ensureAuthenticated, usersController.getNotifications);

module.exports = router;
