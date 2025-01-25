const { Pool } = require("pg");
require("dotenv").config();
const { Sequelize } = require('sequelize');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false 
  //   }
  // }
});

module.exports = {
  sequelize,
  pool
};
