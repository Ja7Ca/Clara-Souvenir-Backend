"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let seedJob = [
            {
                id: 1,
                pegawai_id: 1,
                barang_id: 1,
                jumlah: 100,
                tanggal: new Date("2023/5/21"),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 2,
                pegawai_id: 1,
                barang_id: 2,
                jumlah: 150,
                tanggal: new Date("2023/5/23"),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 3,
                pegawai_id: 2,
                barang_id: 3,
                jumlah: 200,
                tanggal: new Date("2023/5/20"),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 4,
                pegawai_id: 3,
                barang_id: 1,
                jumlah: 200,
                tanggal: new Date("2023/5/22"),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 5,
                pegawai_id: 3,
                barang_id: 2,
                jumlah: 250,
                tanggal: new Date("2023/5/23"),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 6,
                pegawai_id: 3,
                barang_id: 3,
                jumlah: 150,
                tanggal: new Date("2023/5/24"),
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];
        return queryInterface.bulkInsert("jobs", seedJob);
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
