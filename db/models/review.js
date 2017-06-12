'use strict'

const {STRING, INTEGER, FLOAT, ENUM, DATE} = require('sequelize')

module.exports = db => db.define('reviews', {
  rating: {
    type: INTEGER,
    validate: {
      max: 5,
      min: 1
    }
  },
  date: DATE,
  comment: STRING(100)
})

module.exports.associations = (Review, {User, Product}) => {
  Review.belongsTo(User)
  Review.belongsTo(Product)
  // in product model: product.hasMany(Review, as: reviews, through: "product-review")???
}
