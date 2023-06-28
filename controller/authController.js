const { user, pegawai } = require("../models");
const passport = require("../lib/passport");
const mail = require("nodemailer");
const bcrypt = require("bcrypt");

const regex = /^[A-Za-z0-9 ]+$/;

const hash = (password) => {
    return bcrypt.hashSync(password, 10);
};

function formatUser(user) {
    const { id, username, role } = user.dataValues;
    return user.generateToken(id, username, role);
}

const transport = mail.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    sevice: "gmail",
    auth: {
        user: "souvenirclara@gmail.com",
        pass: "sxqcyicqhmcajhfz",
    },
});

function makeid(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

module.exports = {
    postLogin: (req, res) => {
        const { username, password } = req.body;
        if (!regex.test(username) || !regex.test(password)) {
            res.json({
                message: "Dilarang Menggunakan Character Spesial!",
                success: false,
            });
        } else {
            user.authenticate(username, password)
                .then((status) => {
                    let token = formatUser(status);
                    res.json({
                        message: "Login Berhasil",
                        success: true,
                        data: { token },
                    });
                })
                .catch((err) => {
                    res.json({
                        message: err.message,
                        success: false,
                        data: {},
                    });
                });
        }
    },
    login: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    }),
    getWhoami: (req, res) => {
        user.findOne({
            where: { id: req.user.id },
            attributes: { exclude: ["password", "key"] },
            include: {
                model: pegawai,
                as: "product",
            },
        })
            .then((result) => {
                res.json({
                    message: "Get User",
                    success: true,
                    data: result,
                });
            })
            .catch((err) => {
                res.json({
                    message: "failed Get User",
                    success: false,
                    errorr: err.message,
                });
            });
    },
    forgot: (req, res) => {
        let { email, username } = req.body;
        user.findOne({ where: { email, username } })
            .then((result) => {
                console.log(result);
                if (result.length < 1) {
                    res.json({
                        message:
                            "username dengan email tersebut tidak ditemukan",
                        success: false,
                    });
                }
                let key = makeid(25);
                user.update({ key }, { where: { username, email } }).then(
                    () => {
                        let mailOptions = {
                            from: "jarotsetiawan2503@gmail.com",
                            to: email,
                            subject: "test mailer",
                            html:
                                "<p>This is your token</p>\
                    <br>\
                    <h1>Dont send this link to any person</h1>\
                    <p>localhost:3000/forgot/" +
                                key +
                                "</p>",
                        };
                        console.log(mailOptions);
                        transport.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(
                                    "email sent : " +
                                        JSON.stringify(info.envelope.to)
                                );
                            }
                        });
                        res.json({
                            message: "Silahkan cek email anda",
                            success: true,
                        });
                    }
                );
            })
            .catch((err) => {
                console.log(err.message);
                res.json({
                    message: "username dengan email tersebut tidak ditemukan",
                    success: false,
                });
            });
    },
    changeForgotPassword: (req, res) => {
        let { newPassword, key } = req.body;
        user.update(
            { password: hash(newPassword), key: null },
            { where: { key } }
        )
            .then(() => {
                res.json({
                    message: "Password terganti, silahkan login",
                    success: true,
                });
            })
            .catch((err) => {
                res.json({
                    message: "something is wrong",
                    success: false,
                });
            });
    },
    getUserKey: (req, res) => {
        user.findOne({
            where: { key: req.params.key },
            attributes: ["username"],
        })
            .then((result) => {
                res.json({
                    message: "success get user",
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
};
