const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Blacklist = sequelize.define(
  "Blacklist",
  {
    token: { type: DataTypes.STRING, allowNull: false },
   
  },
  { timestamps: false }
);

module.exports = { Blacklist };
