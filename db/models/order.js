'use strict'

const {STRING, INTEGER, FLOAT, ENUM, DATE} = require('sequelize')

module.exports = db => db.define('orders', {
  status: ENUM('processing', 'completed'),
  purchaseDate: DATE,
  purchasedPrice: FLOAT
}, {
  setterMethods: {
    setPrice: function(price) { // get the price from the product table
      this.purchasedPrice = price
    },
    setPurchaseDate: function() {
      this.purchaseDate = Date()
    }
  }
})

module.exports.associations = (Order, {User, Product}) => {
  Order.belongsTo(User)
  Order.belongsToMany(Product, {as: 'products', through: 'order-products'})
}
