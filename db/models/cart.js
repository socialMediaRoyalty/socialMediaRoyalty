'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('carts', {
  // cart id created automatically
})

module.exports.associations = (Cart, {User}) => {
  Cart.belongsTo(User) // what about unauthenticated user? Potentially add attribute for this. Then ensure only 1 or the other -- KHLP
  // Cart.belongsToMany(products, {through: CartDetail}); in sequelize we get the ability to cart.addProducts([]); also able to use include syntax Cart.findAll({include: [Products]}) -- KHLP
}
