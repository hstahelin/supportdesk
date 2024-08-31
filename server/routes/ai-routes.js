const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai-controller");

router.route("/").post(aiController.getResponse);

module.exports = router;
