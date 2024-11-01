const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("merchant", "customer"),
    allowNull: false,
  },
});

// models/User.js
const Product = require("./Product");
const Order = require("./Order");

User.hasMany(Product, { foreignKey: "merchantId" });
Product.belongsTo(User, { foreignKey: "merchantId", as: "merchant" });

User.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(User, { foreignKey: "customerId", as: "customer" });

module.exports = User;
