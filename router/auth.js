const express = require("express");
const restrict = require("../middleware/restrict");
const router = express.Router();
const bodyParser = require("body-parser");

const authController = require("../controller/authController");

router.post("/login", authController.postLogin);
router.get("/whoami", restrict, authController.getWhoami);
router.post("/forgot", authController.forgot);
router.get("/getuserkey/:key", authController.getUserKey);
router.post("/changeforgotpassword", authController.changeForgotPassword);

module.exports = router;
