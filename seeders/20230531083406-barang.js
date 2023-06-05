"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let seedBarang = [
            {
                id: 1,
                nama: "Type 1",
                harga: 400,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 2,
                nama: "Type 2",
                harga: 300,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 3,
                nama: "Type 3",
                harga: 350,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];
        return queryInterface.bulkInsert("barangs", seedBarang);
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
