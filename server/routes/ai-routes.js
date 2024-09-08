const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureAgent,
} = require("../middlewares/authMiddlewares");
const aiController = require("../controllers/ai-controller");

router
  .route("/")
  .post(ensureAuthenticated, ensureAgent, aiController.getResponse);

module.exports = router;
