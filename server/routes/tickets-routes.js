const express = require("express");
const {
  ensureAuthenticated,
  ensureAdmin,
} = require("../middlewares/authMiddlewares");
const router = express.Router();
const ticketsController = require("../controllers/tickets-controller");

router
  .route("/")
  .get(ensureAuthenticated, ticketsController.getAll)
  .post(ensureAuthenticated, ticketsController.create);

router
  .route("/status-summary")
  .get(ensureAuthenticated, ticketsController.getStatusSummary);

router
  .route("/priority-summary")
  .get(ensureAuthenticated, ticketsController.getPrioritySummary);

router
  .route("/:id")
  .get(ensureAuthenticated, ticketsController.getOne)
  .put(ticketsController.updateTicket);

router
  .route("/:id/comments")
  .get(ensureAuthenticated, ticketsController.getComments)
  .post(ensureAuthenticated, ticketsController.createComment);

router
  .route("/:id/timeline")
  .get(ensureAuthenticated, ticketsController.getTimeline);

module.exports = router;
