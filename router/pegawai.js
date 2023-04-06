const express = require("express");
const restrict = require("../middleware/restrict");
const router = express.Router();

const pegawaiController = require("../controller/pegawaiController");

router.get("/pegawai", restrict, pegawaiController.getPegawai);
router.get("/pegawai/:id", restrict, pegawaiController.getOnePegawai);
router.put("/pegawai/:id", restrict, pegawaiController.editPegawai);
router.delete("/pegawai/:id", restrict, pegawaiController.deletePegawai);
router.post("/pegawai", restrict, pegawaiController.addPegawai);

module.exports = router;
