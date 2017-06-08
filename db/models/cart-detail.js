'use strict'

const {STRING, INTEGER, FLOAT} = require('sequelize')

module.exports = db => db.define('cart_details', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  }
})

module.exports.associations = (CartDetail, {Cart, Product}) => {
  CartDetail.belongsTo(Cart)
  CartDetail.belongsTo(Product)
  // CartDetail.hasMany(Product, {as: 'products', through: 'cartDetail-product'})
}
