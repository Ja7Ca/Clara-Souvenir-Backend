const { job, user, pegawai } = require("../models");

module.exports = {
    dashboard: async (req, res) => {
        let countUser, countJob;

        if (req.user.id == "1") {
            countUser = await user.findAll({
                attribute: { exclude: ["password"] },
            });
            countJob = await job.findAll({});

            res.json({
                message: "success get dashboard",
                success: true,
                data: { user: countUser.length, job: countJob.length },
            });
        } else {
            let idPegawai = await pegawai.findOne({
                where: { user_id: req.user.id },
            });

            countJob = await job.findAll({
                where: { pegawai_id: idPegawai.id },
            });

            console.log(countJob);

            res.json({
                message: "success get dashboard",
                success: true,
                data: { user: 2, job: countJob.length },
            });
        }
    },
};
