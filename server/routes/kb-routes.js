const express = require("express");
const {
  ensureAuthenticated,
  ensureAgent,
} = require("../middlewares/authMiddlewares");
const router = express.Router();
const kbController = require("../controllers/kb-controller");

router
  .route("/")
  .get(kbController.getAll)
  .post(ensureAgent, kbController.createKB);

router
  .route("/:id")
  .get(kbController.getOne)
  .put(ensureAgent, kbController.updateKB);

module.exports = router;
