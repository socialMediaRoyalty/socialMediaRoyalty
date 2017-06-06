'use strict'

const {STRING, VIRTUAL, BOOLEAN, INTEGER, DECIMAL} = require('sequelize')


module.exports = db => db.define('products', {
    name: {
       type: STRING,
       allowNull: false
    },
    available : BOOLEAN,
    description: {
        type: TEXT,
        allowNull: false
    },
    quantity: {
        type: INTEGER,
        allowNull : false
    },
    price: {
        type: DECIMAL, 
        allowNull: false
    },
    ratings: {
        type: INTEGER,
        validate: {
            min: 0,
            max: 5
        }
    },
    imageUrl : {
        type: STRING,
        defaultValue : 'https://cdn.tutsplus.com/net/uploads/legacy/958_placeholders/placehold.gif',
        validate: {
            isUrl: true
        }

    }
    //might need category id (ex of foreignKey: Task.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })


})

module.exports.associations = (Product, {Category}) => {
  Product.belongsToMany(Category)
}

