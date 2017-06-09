'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('carts', {
  // cart id created automatically
  unAuthUser: {
    type: STRING
  }
},
  {
    validate: {
      sessionOrUser() {
        if (this.unAuthUser && this.user_id) {
          throw new Error('Can only have a session_id OR a user_id')
        }
      }
    }
  }
)

module.exports.associations = (Cart, {User, Product}) => {
  Cart.belongsTo(User)
  Cart.belongsToMany(Product, {through: 'CartDetail'})
}
