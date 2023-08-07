const { barang } = require("../models");

module.exports = {
    getAllBarang: (req, res) => {
        barang.findAll().then((result) => {
            res.json({
                message: "success get all barang",
                success: true,
                data: result,
            });
        });
    },
};
