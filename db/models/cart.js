'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('orders', {
  // cart id created automatically
})

module.exports.associations = (Cart, {User}) => {
  Cart.belongsTo(User)
}
