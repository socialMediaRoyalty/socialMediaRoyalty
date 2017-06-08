'use strict'

const {STRING, VIRTUAL, BOOLEAN, INTEGER, DECIMAL, TEXT} = require('sequelize')

module.exports = db => db.define('products', {
  name: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: TEXT,
    allowNull: false
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    vallidate: {
      min: 0
    }
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false,
    vallidate: {
      min: 0
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'https://cdn.tutsplus.com/net/uploads/legacy/958_placeholders/placehold.gif',
    validate: {
      isUrl: true
    }
  }
})

module.exports.associations = (Product, {Category, Review, Cart, Order}) => {
  Product.belongsToMany(Category, {through: 'CategoryProduct'})
  Product.belongsToMany(Cart, {through: 'CartDetail'})
  Product.belongsToMany(Review, {through: 'ProductReview'})
  Product.belongsToMany(Order, {through: 'OrderDetail'})
}
