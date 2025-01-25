const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Sesuaikan dengan path ke db.js

const UserSession = sequelize.define('UserSession', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  webhook_url: {
    type: DataTypes.TEXT,
    allowNull: true, // Mengizinkan null
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'user_sessions',
  timestamps: false, // Nonaktifkan timestamps otomatis
  underscored: true, // Gunakan snake_case untuk kolom otomatis
});

module.exports = UserSession;
