'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('carts', {
  // cart id created automatically
})

module.exports.associations = (Cart, {User, Product}) => {
  Cart.belongsTo(User)
  Cart.belongsToMany(Product, {through: 'cart_detail'})
}
