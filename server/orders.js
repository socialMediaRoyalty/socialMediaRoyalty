'use strict'

const db = require('APP/db')
const User = db.model('users')
const Order = db.model('orders')
const Cart = db.model('carts')
// const CartDetail = db.model('cartDetail')
const Product = db.model('products')
const OrderDetail = db.model('order_detail')

const { mustBeLoggedIn, assertAdmin, selfOnly } = require('./auth.filters')

module.exports = require('express').Router()

  // get all orders (Logged in User, ADMIN)
  .get('/',
  mustBeLoggedIn,
  (req, res, next) => {
    if (req.user.isAdmin) {
      if (req.query.status) {
        Order.findAll({
          where: {
            status: req.query.status
          }
        }).then(statusOrders => {
          res.json(statusOrders)
        })
      } else {
        OrderDetail.findAll({
          include: [{
            model: Product,
            include: [{
              model: Order
            }]
          }]
        }).then(orders => {
          res.json(orders)
        })
      }
    } else {
      OrderDetail.findAll({
        where: {
          user_id: req.user.id
        },
        include: [{
          model: Product
        }]
      }).then(orders => {
        res.json(orders)
      })
    }
  })

  .post('/', (req, res, next) => {
    Cart.findOne({
      where: {
        user_id: req.user.id
      },
      include: [{
        model: Product
      }]
    }).then(order => res.json(order)).then(cart => Order.create({
      status: 'received',
      user_id: req.user.id
    })).catch(next)
  })

  // .post('/', (req, res, next) => {
  //   const products = req.body.products
  //   Order.create({status: 'received'})
  //     .then(order => order.setUser(req.user))
  //     .then((order) => {
  //       return products.forEach(product => {
  //         Order.addProduct(product,
  //           {through: {quantity: product.cart_detail.quantity, purchasedPrice: product.price}})
  //       })
  //     })
  //     .then(order => res.json(order))
  //     .catch(next)
  // })

  .param('oid', (req, res, next, oid) => {
    Order.findById(oid)
      .then(order => {
        if (!order) {
          const err = new Error('No orders found')
          err.status = 403
          throw err
        } else {
          req.order = order
          next()
          return null
        }
      }).catch(next)
  })

  // get one order detail
  .get('/:oid', (req, res, next) => {
    OrderDetail.findOne({
      where: {
        order_id: req.params.oid
      },
      include: [{
        model: Order
      }]
    }).then(orderDetail => {
      res.json(orderDetail)
    })
  })

  // put update order status (ADMIN)
  .put('/:oid', assertAdmin, (req, res, next) => {
    req.order.update({
      status: req.body.status
    }).then(order => {
      res.json(order)
    }).catch(next)
  })
