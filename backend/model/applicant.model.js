const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Job = require('./job.model');

const Applicant = sequelize.define('Applicant', {
  applicant_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,  
    }
  },
  resume_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Interviewed', 'Rejected', 'Hired'),
    defaultValue: 'Pending',
  },
  job_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Job,
      key: 'job_id',
    },
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'Applicants',
  timestamps: false,
});

Job.hasMany(Applicant, { foreignKey: 'job_id' });
Applicant.belongsTo(Job, { foreignKey: 'job_id' });

module.exports = Applicant;
