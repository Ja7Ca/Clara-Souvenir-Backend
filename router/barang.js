const express = require("express");
const restrict = require("../middleware/restrict");
const router = express.Router();

const barangController = require("../controller/barangController");
const pController = require("../controller/pController");

router.get("/barang", restrict, barangController.getBarang);
router.get("/allBarang", restrict, pController.getAllBarang);
router.get("/barang/:id", restrict, barangController.getOneBarang);
router.put("/barang/:id", restrict, barangController.updateBarang);
router.post("/barang", restrict, barangController.addBarang);

module.exports = router;
