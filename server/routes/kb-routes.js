const express = require("express");
const router = express.Router();
const kbController = require("../controllers/kb-controller");

router.route("/").get(kbController.getAll).post(kbController.createKB);
router.route("/:id").get(kbController.getOne);
module.exports = router;
