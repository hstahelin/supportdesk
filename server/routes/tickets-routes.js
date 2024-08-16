const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/tickets-controller");

router.route("/").get(ticketsController.getAll);

module.exports = router;
