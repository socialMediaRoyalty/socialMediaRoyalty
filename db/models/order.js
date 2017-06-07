'use strict'

const {STRING, INTEGER, DECIMAL, ENUM, DATE} = require('sequelize')

module.exports = db => db.define('orders', {
  status: ENUM('processing', 'completed'),
  purchaseDate: DATE
}, {
  setterMethods: {
    setPurchaseDate: function() {
      this.purchaseDate = Date()
    }
  }
})

module.exports.associations = (Order, {User, Product}) => {
  Order.belongsTo(User)
}
