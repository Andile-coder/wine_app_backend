const sequelize = require("../config.js");

const { DataTypes } = require("sequelize");

// Define the User model that matches your existing table
const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});
// const create = async () =>
//   await sequelize.sync({ force: true }).then(console.log("Database"));

// create();
module.exports = User;
