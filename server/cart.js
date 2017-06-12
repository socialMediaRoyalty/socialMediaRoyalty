'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const CartDetail = db.model('cart_detail')
const Product = db.model('products')
const Order = db.model('orders')
const OrderDetail = db.model('order_details')
const User = db.model('users')

module.exports = require('express').Router()

// JUST A TESTING ROUTE
// get all carts - test to check Carts model
  .get('/', (req, res, next) => {
    Cart.findAll()
    .then(carts => {
      res.status(201).json(carts)
    })
    .catch(next)
  })
  // create an empty cart for new user
  .post('/',
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
      include: [
        {
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
  .get('/:cid', (req, res, next) => {
    res.status(201).json(req.cart)
  })

// ** add a new cart
  .post('/', (req, res, next) => {
    if (true) {  // if authorized user. replace 'true' with req.user when implemented, or other way to verify user
      Cart.findOrCreate({
        where: {
          user_id: 1 // replace with req.user.id
        },
        include: [
          {
            model: Product
          }
        ]
      })
      .spread((cart, Bool) => {
        if (Bool) {
          res.status(201).json(cart)
        } else {
          res.status(200).json(cart)
        }
      })
      .catch(next)
    } else {
      // unauthorized user, should use localStorage
      res.end()
    }
  })
// **  add product to cart and update quantity
  .put('/:cid', (req, res, next) => {
    const products = req.cart.products
    const productId = req.body.productId
    const quantity = req.body.quantity
    let match = false

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
    .then(([cart_detail, createdBool]) => {
      if (!createdBool) {
        cart_detail.update({
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
  .delete('/:cid', (req, res, next) => {
    req.cart.destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
  })
