"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let seedPegawai = [
            {
                id: 1,
                nama: "Bagasa",
                alamat: "Klaten",
                no_hp: "008008080800808",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 2,
                nama: "Budi",
                alamat: "Solo",
                no_hp: "0081231230808",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 3,
                nama: "Citra",
                alamat: "Pakis",
                no_hp: "00800853453458",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];
        return queryInterface.bulkInsert("pegawais", seedPegawai);
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
