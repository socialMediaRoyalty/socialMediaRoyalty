'use strict'

const {STRING, INTEGER, FLOAT} = require('sequelize')

module.exports = db => db.define('cart_details', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  }
})

module.exports.associations = (CartDetail, {Cart}) => {
  CartDetail.belongsTo(Cart)
  // Cart_Detail.hasMany(Product), add this line after product model is defined
}
