'use strict'

const {STRING, INTEGER, DECIMAL, ENUM, DATE} = require('sequelize')

module.exports = db => db.define('order-details', {
  purchasedPrice: DECIMAL, // validate positive; (10,2) -- KHLP
  quantity: {
    type: INTEGER,
    defaultValue: 1 // validate positive
  }
}, {
  setterMethods: { // how are you making order???? -- KHLP
    setPrice: function(price) { // get the price from the product table
      this.purchasedPrice = price
    }
  }
})

module.exports.associations = (OrderDetails, {Order, Product}) => {
  OrderDetails.belongsTo(Order)
  // OrderDetails.belongsTo(product) -- KHLP
  OrderDetails.belongsToMany(Product, {as: 'products', through: 'order-products'}) // delete me -- KHLP
}
