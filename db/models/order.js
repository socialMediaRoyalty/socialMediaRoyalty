'use strict'

const {STRING, INTEGER, DECIMAL, ENUM, DATE} = require('sequelize')

module.exports = db => db.define('orders', {
  status: ENUM('processing', 'completed'),
  purchaseDate: DATE // consider leveraging the createdAt attribute or use default value and NOW instead of setter -- KHLP
}, {
  setterMethods: {
    setPurchaseDate: function() {
      this.purchaseDate = Date()
    }
  }
})

module.exports.associations = (Order, {User, Product}) => {
  Order.belongsTo(User)
  // Order.belongsToMany Product through order detail -- KHLP
}
