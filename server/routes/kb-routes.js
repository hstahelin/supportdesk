const express = require("express");
const {
  ensureAuthenticated,
  ensureAgent,
} = require("../middlewares/authMiddlewares");
const router = express.Router();
const kbController = require("../controllers/kb-controller");

router
  .route("/")
  .get(ensureAuthenticated, kbController.getAll)
  .post(ensureAuthenticated, ensureAgent, kbController.createKB);

router
  .route("/:id")
  .get(ensureAuthenticated, kbController.getOne)
  .put(ensureAuthenticated, ensureAgent, kbController.updateKB);

module.exports = router;
