'use strict'

const db = require('APP/db')
const User = db.model('users')
const Order = db.model('orders')

// const assertAdmin = require('APP/server/auth.filter')

module.exports = require('express').Router()
// get order history
  .get('/history', (req, res, next) => {
    Order.findAll({
      include: [{
        model: User,
        where: { id: 1 }
      }],
    }).then(orders => {
      res.send(orders)
    }).catch(next)
  })

// get one order detail
.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
  .then(order => {
    res.send(order)
  }).catch(next)
})

// get all orders (ADMIN)
.get('/', (req, res, next) => {
  Order.findAll({})
  .then(orders => {
    console.log(orders)
    res.send(orders)
  }).catch(next)
})

// get orders by status (ADMIN)
.get('/status?', (req, res, next) => {
  if (req.query.status === 'processing') {
    Order.findAll({
      where: {
        status: 'processing'
      }
    }).then(orders => {
      console.log(orders)
      res.send(orders)
    }).catch(next)
  }
  if (req.query.status === 'completed') {
    Order.findAll({
      where: {
        status: 'completed'
      }
    }).then(orders => {
      res.send(orders)
    }).catch(next)
  }
})

// put update order status (ADMIN)
.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update({
      status: req.body
    }).then(order => {
      res.send(order)
    })).catch(next)
})
