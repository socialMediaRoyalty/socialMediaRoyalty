'use strict'

const {STRING, INTEGER, DECIMAL, ENUM, DATE} = require('sequelize')

module.exports = db => db.define('orders', {
  status: ENUM(
    'received',
    'processed',
    'shipped'
    ),
  purchaseDate: DATE
}, {
  setterMethods: {
    setPurchaseDate: function() {
      this.purchaseDate = new Date()
    }
  }
})

module.exports.associations = (Order, {User, Product}) => {
  Order.belongsToMany(Product, {through: 'order_detail'})
  Order.belongsTo(User)
}
