const express = require("express");
const restrict = require("../middleware/restrict");
const router = express.Router();

const jobController = require("../controller/jobController");

router.get("/job/:pegawai_id", restrict, jobController.getJobUser);
router.get("/job-date/:pegawai_id?", restrict, jobController.getJobDate);
router.post("/job", restrict, jobController.addJob);
router.get("/allJob?", restrict, jobController.getAllJob);
router.delete("/job/:id", restrict, jobController.deleteJob);

module.exports = router;
