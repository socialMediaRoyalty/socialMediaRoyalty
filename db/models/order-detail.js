'use strict'

const {STRING, INTEGER, DECIMAL, ENUM, DATE} = require('sequelize')

module.exports = db => db.define('order-details', {
  purchasedPrice: {
    type: DECIMAL(10, 2),
    validate: {
      $gt: 0
    }
  },
  quantity: {
    type: INTEGER,
    defaultValue: 1,
    validate: {
      $gt: 0
    }
  }
})

module.exports.associations = (OrderDetails, {Order, Product}) => {
  OrderDetails.belongsTo(Order)
  OrderDetails.belongsToMany(Product, {as: 'products', through: 'order-products'})
}
