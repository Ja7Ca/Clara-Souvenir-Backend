const { pegawai, user } = require("../models");
const bcrypt = require("bcrypt");

const Sequelize = require("sequelize");

const hash = (password) => {
    return bcrypt.hashSync(password, 10);
};

module.exports = {
    getPegawai: (req, res) => {
        console.log(req.user.role);
        if (req.user.role == "Admin") {
            pegawai
                .findAll({
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
        } else {
            pegawai
                .findAll({
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: { user_id: req.user.id },
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
        }
    },
    getOnePegawai: (req, res) => {
        pegawai
            .findOne({
                where: { id: req.params.id },
                attributes: ["id", "nama", "no_hp", "alamat"],
                include: {
                    model: user,
                    as: "user",
                    attributes: { exclude: ["password", "key"] },
                },
            })
            .then((result) => {
                res.json({
                    message: "Success get one pegawai",
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
    },
    editPegawai: async (req, res) => {
        let id = req.params.id;
        const { nama, noHp, alamat, email, password, changePass } = req.body;
        let userId = await pegawai.findOne({
            where: { id },
        });
        console.log(userId.user_id, "A");
        pegawai
            .update(
                { nama, no_hp: noHp, alamat },
                { where: { id: req.params.id } }
            )
            .then(async (result) => {
                if (password) {
                    user.update(
                        { email, password: hash(password) },
                        { where: { id: userId.user_id } }
                    ).then((result) => {
                        res.json({
                            message: "Success update one pegawai",
                            success: true,
                            data: result,
                        });
                    });
                } else {
                    user.update(
                        { email },
                        { where: { id: userId.user_id } }
                    ).then((result) => {
                        res.json({
                            message: "Success update one pegawai",
                            success: true,
                            data: result,
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
    deletePegawai: (req, res) => {
        let id = req.params.id;
        pegawai
            .findOne({
                where: { id: req.params.id },
                attributes: ["id", "nama", "no_hp", "alamat"],
            })
            .then((result) => {
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
            })
            .catch((err) => {
                res.json({
                    message: err.message,
                    success: false,
                });
            });
    },
    addPegawai: async (req, res) => {
        const { nama, noHp, alamat, username, email, password } = req.body;
        console.log(req.body);
        let cekUsername = await user.findOne({ where: { username } });

        if (cekUsername) {
            res.json({
                message: "Username Sudah Digunakan",
                success: true,
            });
        } else {
            user.create({
                username,
                email,
                role: "Pegawai",
                key: null,
                password: hash(password),
            })
                .then((result) => {
                    pegawai
                        .create({
                            nama,
                            no_hp: noHp,
                            alamat,
                            user_id: result.id,
                            userId: result.id,
                        })
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
                })
                .catch((err) => {
                    res.json({
                        message: "Tambah pegawai gagal",
                        success: false,
                        data: err.message,
                    });
                });
        }
    },
};
