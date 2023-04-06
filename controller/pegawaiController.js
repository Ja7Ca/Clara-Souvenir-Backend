const { pegawai } = require("../models");

const Sequelize = require("sequelize");

module.exports = {
    getPegawai: (req, res) => {
        pegawai
            .findAll({
                where: {
                    id: {
                        [Sequelize.Op.ne]: "1",
                    },
                },
                attributes: { exclude: ["createdAt", "updatedAt"] },
            })
            .then((response) => {
                res.json({
                    message: "Sukses mendapatkan pegawai",
                    success: true,
                    data: response,
                });
            })
            .catch((err) => {
                res.json({ message: err.message, success: false });
            });
    },
    getOnePegawai: (req, res) => {
        let id = req.params.id;
        pegawai
            .findOne({
                where: { id: req.params.id },
                attributes: ["id", "nama", "no_hp", "alamat"],
            })
            .then((result) => {
                if (id == 1 || !id) {
                    res.json({
                        message: "cannot access",
                        success: false,
                    });
                } else {
                    res.json({
                        message: "Success get one pegawai",
                        success: true,
                        data: result,
                    });
                }
            })
            .catch((err) => {
                res.json({
                    message: err.message,
                    success: false,
                });
            });
    },
    editPegawai: (req, res) => {
        let id = req.params.id;
        console.log(req.body, id);
        const { nama, noHp, alamat } = req.body;
        pegawai
            .update(
                { nama, no_hp: noHp, alamat },
                { where: { id: req.params.id } }
            )
            .then((result) => {
                if (id == 1 || !id) {
                    res.json({
                        message: "cannot access",
                        success: false,
                    });
                } else {
                    res.json({
                        message: "Success update one pegawai",
                        success: true,
                        data: result,
                    });
                }
            })
            .catch((err) => {
                res.json({
                    message: err.message,
                    success: false,
                });
            });
    },
    deletePegawai: (req, res) => {
        let id = req.params.id;
        pegawai
            .findOne({
                where: { id: req.params.id },
                attributes: ["id", "nama", "no_hp", "alamat"],
            })
            .then((result) => {
                if (id == 1 || !id) {
                    res.json({
                        message: "cannot access",
                        success: false,
                    });
                } else {
                    pegawai
                        .destroy({ where: { id } })
                        .then((result) => {
                            res.json({
                                message: "Success delete one pegawai",
                                success: true,
                                data: result,
                            });
                        })
                        .catch((err) => {
                            res.json({
                                message: err.message,
                                success: false,
                            });
                        });
                }
            })
            .catch((err) => {
                res.json({
                    message: err.message,
                    success: false,
                });
            });
    },
    addPegawai: (req, res) => {
        const { nama, noHp, alamat } = req.body;
        pegawai
            .create({ nama, no_hp: noHp, alamat })
            .then((response) => {
                res.json({
                    message: "Tambah pegawai berhasil",
                    success: true,
                    data: response,
                });
            })
            .catch((err) => {
                res.json({
                    message: "Tambah pegawai gagal",
                    success: false,
                    data: err.message,
                });
            });
    },
};
