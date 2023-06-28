"use strict";

const bcrypt = require("bcrypt");
const hash = (password) => {
    return bcrypt.hashSync(password, 10);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let seedUser = [
            {
                id: 1,
                username: "admin",
                password: hash("admin"),
                email: "l200190207@student.ums.ac.id",
                role: "Admin",
                key: null,
                created_at: new Date(),
                updated_at: new Date(),
            },
            // {
            //     id: 2,
            //     username: "user",
            //     password: hash("user"),
            //     email: "user@user.com",
            //     role: "Pegawai",
            //     key: null,
            //     created_at: new Date(),
            //     updated_at: new Date(),
            // },
            // {
            //     id: 3,
            //     username: "test",
            //     password: hash("test"),
            //     email: "test@test.com",
            //     role: "Pegawai",
            //     key: null,
            //     created_at: new Date(),
            //     updated_at: new Date(),
            // },
        ];
        return queryInterface.bulkInsert("users", seedUser);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
