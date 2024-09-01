const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureAdmin,
} = require("../middlewares/authMiddlewares");
const aiController = require("../controllers/ai-controller");

router.route("/").post(ensureAuthenticated, aiController.getResponse);

module.exports = router;
