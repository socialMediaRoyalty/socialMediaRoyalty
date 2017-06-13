'use strict'

const {STRING, INTEGER, FLOAT} = require('sequelize')

module.exports = db => db.define('cart_detail', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  }
})

