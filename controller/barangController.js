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
};
