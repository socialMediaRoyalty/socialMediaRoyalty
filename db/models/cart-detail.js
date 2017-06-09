'use strict'

const {STRING, INTEGER, FLOAT} = require('sequelize')

module.exports = db => db.define('CartDetail', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  }
})

