const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();

const sequelize = new Sequelize(
  `${process.env.POSTGRES_DATABASE}`,
  `${process.env.POSTGRES_USER}`,
  `${process.env.POSTGRES_PASSWORD}`,
  {
    host: `${process.env.POSTGRES_HOST}`,
    // dialect: "postgres",
    dialectModule: require("pg"),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Set to false if your certificate is self-signed or not trusted by a recognized authority
      },
    },
  }
);

module.exports = sequelize;
