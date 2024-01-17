const sequelize = require("../config.js");

const { DataTypes } = require("sequelize");
const User = require("./UserModel.js");
const Wine = sequelize.define("Wine", {
  wine_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "user_id",
    },
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  consumed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  date_consumed: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  varietal: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Wine;
