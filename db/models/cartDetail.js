'use strict'

const {STRING, INTEGER, FLOAT} = require('sequelize')

module.exports = db => db.define('cartDetail', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  }
})

