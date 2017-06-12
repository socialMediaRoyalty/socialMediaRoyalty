'use strict'

const {STRING, INTEGER, DECIMAL, ENUM, DATE} = require('sequelize')

module.exports = db => db.define('order_details', {
  purchasedPrice: {
    type: DECIMAL(10, 2),
    validate: {
      min: 0.01,
      isDecimal: true
    }
  },
  quantity: {
    type: INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      isInt: true
    }
  }
})

module.exports.associations = (OrderDetails, {Order, Product}) => {
  OrderDetails.belongsTo(Order)
  OrderDetails.belongsToMany(Product, {as: 'products', through: 'order_products'})
}
