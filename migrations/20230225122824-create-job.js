"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("jobs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            pegawai_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "pegawais",
                    key: "id",
                },
                onUpdate: "cascade",
                onDelete: "cascade",
            },
            barang_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "barangs",
                    key: "id",
                },
                onUpdate: "cascade",
                onDelete: "cascade",
            },
            jumlah: {
                type: Sequelize.INTEGER,
            },
            tanggal: {
                type: Sequelize.DATEONLY,
                // timezone: "+07:00",
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("jobs");
    },
};
