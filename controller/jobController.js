const { job, pegawai, barang } = require("../models");

const Sequelize = require("sequelize");

module.exports = {
    getJobUser: (req, res) => {
        job.findAll({
            where: { pegawai_id: req.params.pegawai_id },
            attributes: ["barang_id", "pegawai_id", "jumlah"],
            include: [
                {
                    model: pegawai,
                    attributes: ["nama", "alamat"],
                    as: "pegawai",
                },
                {
                    model: barang,
                    attributes: ["nama", "harga"],
                    as: "barang",
                },
            ],
        })
            .then((response) => {
                if (response.length > 0) {
                    res.json({
                        message: "Berhasil mendapatkan job",
                        success: true,
                        data: response,
                    });
                } else {
                    res.json({
                        message: "Job Kosong",
                        success: true,
                        data: [
                            {
                                barang_id: "",
                                jumlah: 0,
                                pegawai: {
                                    nama: "",
                                    alamat: "",
                                },
                                barang: {
                                    nama: "Type A",
                                    harga: 0,
                                },
                                pegawai_id: "",
                            },
                        ],
                    });
                }
            })
            .catch((err) => {
                res.json({ message: err.message, success: false });
            });
    },
    getJobDate: (req, res) => {
        job.findAll({
            where: {
                tanggal: {
                    [Sequelize.Op.between]: [req.query.start, req.query.end],
                },
                pegawai_id: req.params.pegawai_id,
            },
            attributes: ["barang_id", "pegawai_id", "jumlah"],
            include: [
                {
                    model: pegawai,
                    attributes: ["nama", "alamat"],
                    as: "pegawai",
                },
                {
                    model: barang,
                    attributes: ["nama", "harga"],
                    as: "barang",
                },
            ],
        })
            .then((response) => {
                let total = 0;
                if (response.length > 0) {
                    response.map((el) => {
                        total += el.barang.harga * el.jumlah;
                    });
                    res.json({
                        message: "Berhasil mendapatkan job",
                        success: true,
                        data: response,
                        total,
                    });
                } else {
                    res.json({
                        message: "Job Kosong",
                        success: true,
                        data: [
                            {
                                barang_id: "",
                                jumlah: 0,
                                pegawai: {
                                    nama: "",
                                    alamat: "",
                                },
                                barang: {
                                    nama: "Type A",
                                    harga: 0,
                                },
                                pegawai_id: "",
                            },
                        ],
                        total: 0,
                    });
                }
            })
            .catch((err) => {
                res.json({ message: err.message, success: false });
            });
    },
    addJob: (req, res) => {
        let { pegawai_id, barang_id, jumlah, tanggal } = req.body;
        job.create({ pegawai_id, barang_id, jumlah, tanggal })
            .then((result) => {
                res.json({
                    message: "Success tambah job",
                    success: true,
                    data: result,
                });
            })
            .catch((err) => {
                res.json({
                    message: "Gagal tambah job",
                    success: false,
                    data: err.message,
                });
            });
    },
    getAllJob: (req, res) => {
        if (req.user.role == "Admin") {
            job.findAll({
                attributes: [
                    "id",
                    "pegawai_id",
                    "barang_id",
                    "jumlah",
                    "tanggal",
                ],
                include: [
                    {
                        model: pegawai,
                        attributes: ["nama", "alamat"],
                        as: "pegawai",
                    },
                    {
                        model: barang,
                        attributes: ["nama", "harga"],
                        as: "barang",
                    },
                ],
                order: [["tanggal", "DESC"]],
            })
                .then((result) => {
                    res.json({
                        message: "Success get all job",
                        success: true,
                        data: result,
                    });
                })
                .catch((err) => {
                    res.json({
                        message: "Gagal get job",
                        success: false,
                        data: err.message,
                    });
                });
        } else {
            job.findAll({
                attributes: [
                    "id",
                    "pegawai_id",
                    "barang_id",
                    "jumlah",
                    "tanggal",
                ],
                include: [
                    {
                        model: pegawai,
                        attributes: ["nama", "alamat"],
                        as: "pegawai",
                        where: { user_id: req.user.id },
                    },
                    {
                        model: barang,
                        attributes: ["nama", "harga"],
                        as: "barang",
                    },
                ],
                order: [["tanggal", "DESC"]],
            })
                .then((result) => {
                    res.json({
                        message: "Success get all job",
                        success: true,
                        data: result,
                    });
                })
                .catch((err) => {
                    res.json({
                        message: "Gagal get job",
                        success: false,
                        data: err.message,
                    });
                });
        }
    },
    deleteJob: (req, res) => {
        let { id } = req.params;
        job.destroy({ where: { id } })
            .then((result) => {
                res.json({
                    message: "Success delete job",
                    success: true,
                    data: result,
                });
            })
            .catch((err) => {
                res.json({
                    message: "Gagal delete job",
                    success: false,
                    data: err.message,
                });
            });
    },
};
