"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class pegawai extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.user, {
                foreignKey: "user_id",
                as: "user",
                unique: true,
            });
        }
    }
    pegawai.init(
        {
            user_id: DataTypes.INTEGER,
            nama: DataTypes.STRING,
            alamat: DataTypes.STRING,
            no_hp: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "pegawai",
            underscored: true,
        }
    );
    return pegawai;
};
