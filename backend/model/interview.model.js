const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Applicant = require('./Applicant'); 

const Interview = sequelize.define('Interview', {
  interview_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  interview_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  interviewer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  applicant_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Applicant, 
      key: 'applicant_id',
    },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'Interviews',
  timestamps: false,
});

Applicant.hasMany(Interview, { foreignKey: 'applicant_id' });
Interview.belongsTo(Applicant, { foreignKey: 'applicant_id' });

module.exports = Interview;
