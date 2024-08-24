const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/tickets-controller");

router.route("/").get(ticketsController.getAll).post(ticketsController.create);
router.route("/status-summary").get(ticketsController.getStatusSummary);
router.route("/priority-summary").get(ticketsController.getPrioritySummary);
router.route("/:id").get(ticketsController.getOne);
router
  .route("/:id/comments")
  .get(ticketsController.getComments)
  .post(ticketsController.createComment);
module.exports = router;
