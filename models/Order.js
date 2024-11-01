const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  discount: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  shippingFee: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
});

module.exports = Order;
