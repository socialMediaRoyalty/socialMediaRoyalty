'use strict'

const {STRING, INTEGER, DECIMAL, ENUM, DATE} = require('sequelize')

module.exports = db => db.define('order-details', {
  purchasedPrice: DECIMAL,
  quantity: {
    type: INTEGER,
    defaultValue: 1
  }
}, {
  setterMethods: {
    setPrice: function(price) { // get the price from the product table
      this.purchasedPrice = price
    }
  }
})

module.exports.associations = (OrderDetails, {Order, Product}) => {
  OrderDetails.belongsTo(Order)
  OrderDetails.belongsToMany(Product, {as: 'products', through: 'order-products'})
}
