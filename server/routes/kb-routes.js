const express = require("express");
const {
  ensureAuthenticated,
  ensureAdmin,
} = require("../middlewares/authMiddlewares");
const router = express.Router();
const kbController = require("../controllers/kb-controller");

router
  .route("/")
  .get(kbController.getAll)
  .post(ensureAuthenticated, kbController.createKB);
router
  .route("/:id")
  .get(kbController.getOne)
  .put(ensureAuthenticated, kbController.updateKB);
module.exports = router;
