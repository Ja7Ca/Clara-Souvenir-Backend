const { barang } = require("../models");

const Sequelize = require("sequelize");

module.exports = {
    getBarang: (req, res) => {
        barang
            .findAll({ attributes: ["id", "nama"] })
            .then((response) => {
                res.json({
                    message: "success get barang",
                    success: true,
                    data: response,
                });
            })
            .catch((error) => {
                res.json({
                    message: "gagal get barang",
                    success: false,
                    data: error.message,
                });
            });
    },
    getOneBarang: (req, res) => {
        let { id } = req.params;

        barang
            .findOne({ where: { id } })
            .then((response) => {
                res.json({
                    message: "success get one barang",
                    success: true,
                    data: response,
                });
            })
            .catch((error) => {
                res.json({
                    message: "gagal get one barang",
                    success: false,
                    data: error.message,
                });
            });
    },
    updateBarang: (req, res) => {
        let { id } = req.params;
        let { nama, harga } = req.body;

        barang
            .update({ nama, harga }, { where: { id } })
            .then((response) => {
                res.json({
                    message: "success edit barang",
                    success: true,
                    data: response,
                });
            })
            .catch((error) => {
                res.json({
                    message: "gagal edit barang",
                    success: false,
                    data: error.message,
                });
            });
    },
    addBarang: (req, res) => {
        let { nama, harga } = req.body;
        console.log(req.body);
        barang
            .create({ nama, harga })
            .then((result) => {
                res.json({
                    message: "success tambah barang",
                    success: true,
                    data: result,
                });
            })
            .catch((err) => {
                res.json({
                    message: "success tambah barang",
                    success: false,
                    data: err,
                });
            });
    },
};
