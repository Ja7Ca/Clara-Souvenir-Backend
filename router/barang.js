const express = require("express");
const restrict = require("../middleware/restrict");
const router = express.Router();

const barangController = require("../controller/barangController");

router.get("/barang", restrict, barangController.getBarang);

module.exports = router;
