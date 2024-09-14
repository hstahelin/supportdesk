const express = require("express");
const {
  ensureAuthenticated,
  ensureAdmin,
  ensureAgent,
} = require("../middlewares/authMiddlewares");
const router = express.Router();
const ticketsController = require("../controllers/tickets-controller");

router
  .route("/")
  .get( ticketsController.getAll)
  .post( ticketsController.create);

router
  .route("/status-summary")
  .get( ticketsController.getStatusSummary);

router
  .route("/priority-summary")
  .get( ticketsController.getPrioritySummary);

router
  .route("/:id")
  .get( ticketsController.getOne)
  .put( ticketsController.updateTicket);

router
  .route("/:id/comments")
  .get( ticketsController.getComments)
  .post( ticketsController.createComment);

router
  .route("/:id/timeline")
  .get( ticketsController.getTimeline);

module.exports = router;
