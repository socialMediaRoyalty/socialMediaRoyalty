'use strict'

const {STRING} = require('sequelize')
// delete me  -- kHLP
module.exports = db => db.define('favorites')

module.exports.associations = (Favorite, {Thing, User}) => {
  Favorite.belongsTo(Thing)
  Favorite.belongsTo(User)
}
