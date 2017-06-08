'use strict'

const db = require('APP/db')
const User = db.model('users')
const Order = db.model('orders')

// const assertAdmin = require('APP/server/auth.filter')

module.exports = require('express').Router()
// get order history
  .get('/history', (req, res, next) => { // handle this in get(`/`) -- KHLP
    Order.findAll({
      include: [{
        model: User,
        where: { id: 1 }
      }],
    }).then(orders => {
      res.send(orders) // json vs send -- KHLP
    }).catch(next)
  })

// get one order detail
// use router.param -- KHLP
.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
  .then(order => { // handle no order -- KHLP
    res.send(order)
  }
  }).catch(next)
})

// get all orders (ADMIN)
.get('/', (req, res, next) => {
  // if admin return all, if logged in filter by req.user.id, if not logged in send none -- KHLP
  // add query of status here -- KHLP
  Order.findAll({})
  .then(orders => {
    console.log(orders) // no logs in master -- KHLP
    res.send(orders)
  }).catch(next)
})

// get orders by status (ADMIN)
.get('/status?', (req, res, next) => { // this doesn't match -- KHLP
  if (req.query.status === 'processing') { // move this logic to a scope in the model
    Order.findAll({
      where: {
        status: 'processing' // or maybe just have req.query.status -- KHLP
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
      status: req.body // req.body.status -- KHLP
    }).then(order => {
      res.send(order)
    })).catch(next)
})
