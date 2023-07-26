const express = require("express");
const restrict = require("../middleware/restrict");
const router = express.Router();
const bodyParser = require("body-parser");

const authController = require("../controller/authController");
const dashboardController = require("../controller/dashboardController");

router.post("/login", authController.postLogin);
router.get("/whoami", restrict, authController.getWhoami);
router.post("/forgot", authController.forgot);
router.get("/getuserkey/:key", authController.getUserKey);
router.post("/changeforgotpassword", authController.changeForgotPassword);

router.get("/dashboard", restrict, dashboardController.dashboard);

module.exports = router;
