"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class job extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.pegawai, {
                foreignKey: "pegawai_id",
                as: "pegawai",
                unique: false,
            });
            this.belongsTo(models.barang, {
                foreignKey: "barang_id",
                as: "barang",
                unique: false,
            });
        }
    }
    job.init(
        {
            pegawai_id: DataTypes.INTEGER,
            barang_id: DataTypes.INTEGER,
            jumlah: DataTypes.INTEGER,
            tanggal: DataTypes.DATEONLY,
        },
        {
            sequelize,
            modelName: "job",
            underscored: true,
        }
    );
    return job;
};
