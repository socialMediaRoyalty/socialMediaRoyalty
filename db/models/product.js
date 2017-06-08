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
  quantity: { // validate positive -- KHLP
    type: INTEGER,
    allowNull: false
  },
  price: {
    type: DECIMAL, // consider (10,2) -- KHLP
    allowNull: false
  },
  ratings: { // consider update hook, might have bugs, if you do call me. Also, consider just doing this on the frontend (know you cannot do this in a getter becasue async) -- KHLP
    type: INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'https://cdn.tutsplus.com/net/uploads/legacy/958_placeholders/placehold.gif',
    validate: {
      isUrl: true
    }
  } // might need category id (ex of foreignKey: Task.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }) // comments in master..... -- KHLP
})

module.exports.associations = (Product, {Category}) => {
  Product.belongsToMany(Category, {through: 'CategoryProduct'})
  // Product.belongsToMany(Cart, {through: CartDetail}) -- KHLP
  // Product.hasMany(Review) -- KHLP
  // Product.belongsToMany(Order... ) -- KHLP
}
