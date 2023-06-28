"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        checkPassword = (password, db_password) => {
            return bcrypt.compareSync(password, db_password);
        };

        generateToken = (id, username) => {
            const payload = {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                id,
                username,
            };
            console.log(payload);
            const rahasia = "Ini sangat rahasia";
            const token = jwt.sign(payload, rahasia);
            return token;
        };

        static authenticate = async (username, password) => {
            try {
                const userLog = await this.findOne({ where: { username } });
                if (!userLog) return Promise.reject("Username not found!");
                const isPasswordValid = await userLog.checkPassword(
                    password,
                    userLog.password
                );
                if (!isPasswordValid) return Promise.reject("Wrong Password!");

                return Promise.resolve(userLog);
            } catch (error) {
                return Promise.reject(error);
            }
        };

        static associate(models) {
            this.hasMany(models.pegawai, { as: "product" });
        }

        static #encrypt = (password) => {
            return bcrypt.hashSync(password, 10);
        };
        static register = (res, username, password) => {
            const encryptedPassword = this.#encrypt(password);
            console.log(username, encryptedPassword);
            this.findOne({ where: { email } }).then((found) => {
                if (found == null) {
                    return this.create({
                        username,
                        password: encryptedPassword,
                    })
                        .then((data) => {
                            res.json({
                                message: "Register Berhasil",
                                success: true,
                                data,
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.json({
                                message: "Register Gagal",
                                success: false,
                                data: {},
                            });
                        });
                } else {
                    return res.json({
                        message: "Username sudah digunakan",
                        success: false,
                        data: {},
                    });
                }
            });
        };
    }
    user.init(
        {
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            key: DataTypes.STRING,
            role: DataTypes.ENUM("Admin", "Pegawai"),
        },
        {
            sequelize,
            modelName: "user",
            underscored: true,
        }
    );
    return user;
};
