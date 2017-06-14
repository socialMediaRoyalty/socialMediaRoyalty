'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const CartDetail = db.model('cart_detail')
const Product = db.model('products')
const Order = db.model('orders')
const OrderDetail = db.model('order_detail')
const User = db.model('users')
const {assertSelfOrAdmin} = require('./auth.filters')

module.exports = require('express').Router()

// JUST A TESTING ROUTE
// get all carts - test to check Carts model
  .get('/',
    // assertSelfOrAdmin,
    (req, res, next) => {
      Cart.findAll({
        include: [{
          model: User,
          where: req.query
        }, {
          model: Product
        }]
      })
      .then(carts => {
        res.status(201).json(carts)
      })
      .catch(next)
    })
  // get cart for specific user
  .get('/user',
    // assertSelfOrAdmin,
    (req, res, next) => {
      Cart.findAll({
        include: [{
          model: User,
          where: req.query
        }, {
          model: Product
        }]
      })
        .then(carts => {
          res.status(201).json(carts)
        })
        .catch(next)
    })
  // create an empty cart for new user
  .post('/',
    assertSelfOrAdmin,
    (req, res, next) =>
      Cart.create(req.body)
        .then(createdCart => {
          createdCart.setUser(req.user)
          res.status(201).json(createdCart)
        })
        .catch(next)
  )

// ** Find a cart and add it to req.cart
  .param('cid', (req, res, next, cid) => {
    Cart.findOne({
      where: { id: cid },
      include: [{
        model: User
      }, {
        model: Product
      }]
    }).then(cart => {
      if (!cart) {
        const err = new Error('Cart Not Found')
        err.status = 404
        next(err)
      } else {
        req.cart = cart
        next()
        return null
      }
    })
    .catch(next)
  })

// ** get a cart by id
  .get('/:cid',
   assertSelfOrAdmin,
    (req, res, next) => {
      res.status(201).json(req.cart)
    })

// **  add product to cart and update quantity
  .put('/:cid',
    // assertSelfOrAdmin,
    (req, res, next) => {
    console.log('>>>>>>inside put cart route')
      const productId = req.body.productId
      const quantity = req.body.quantity
      if (quantity === '0') {
        CartDetail.destroy({
          where: {
            cart_id: req.cart.id,
            product_id: productId
          }
        })
        .then(() => res.sendStatus(204))
        .catch(next)
      }

      CartDetail.findOrCreate({
        where: {
          cart_id: req.cart.id,
          product_id: productId
        }
      })
      .then(([cartDetail, createdBool]) => {
        if (!createdBool) {
          cartDetail.update({
            quantity: quantity
          })
        } else {
          req.cart.addProduct(productId, { through: { quantity: quantity } })
        }
      })
      .then(() => res.json(req.cart))
      .catch(next)
    })

// ** delete cart
  .delete('/:cid',
    assertSelfOrAdmin,
    (req, res, next) => {
      req.cart.destroy()
      .then(() => res.sendStatus(204))
      .catch(next)
    })
