'use strict'

const {STRING, VIRTUAL, BOOLEAN, INTEGER, DECIMAL} = require('sequelize')


module.exports = db => db.define('categories', {
    name: {
       type: STRING,
       allowNull: false
    }

})

module.exports.associations = (Category, {Product}) => {
    Category.belongsToMany(Product)
}

