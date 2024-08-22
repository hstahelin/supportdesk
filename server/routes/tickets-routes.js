const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/tickets-controller");

router.route("/").get(ticketsController.getAll);
router.route("/status-summary").get(ticketsController.getStatusSummary);
router.route("/priority-summary").get(ticketsController.getPrioritySummary);
module.exports = router;
