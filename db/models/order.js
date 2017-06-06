'use strict'

const {STRING, INTEGER, FLOAT, ENUM, DATE} = require('sequelize')

module.exports = db => db.define('carts', {
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

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
  // Order hasMany(Product)
}
