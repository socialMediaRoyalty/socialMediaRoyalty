'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
// const CartDetail = db.model('cart_details')
const Product = db.model('products')
const Order = db.model('orders')
const OrderDetail = db.model('order-details')
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

// Create a cart when a visitor opens the site
  // .post('/', (req, res, next) => {

  //   console.log('this is req.user', req.user)
  //   res.json(req.user)

  //   if (!req.user) {
  //     Cart.create({
  //       unAuthUser: 'THIS SHOULD BE THE SESSION COOKIE???'
  //     })
  //   }

  // })

// ** Find a cart and add it to req.cart
  .param('cid', (req, res, next, cartId) => {
    Cart.find({
      where: { id: cartId },
      include: [
        {
          model: Product
        }]
    }).then(cart => {
      req.cart = cart
      next()
    })
    .catch(next)
  })

// ** get a cart by id
  .get('/:cid', (req, res, next) => {
    res.status(201).json(req.cart)
  })

// **  add product to cart and update quantity
  .post('/:cid', (req, res, next) => {
    const products = req.cart.products
    const productId = req.body.productId
    const quantity = req.body.quantity
    let match

    products.forEach(product => {
      if (product.id === productId) {
        match = product
      }
    })

  // if the product is already in the cart, update quantity
    if (match) {
      match.update({ quantity: quantity })
      .then(updatedCart => res.sendStatus(201))
      .catch(next)

  // otherwise, create a new cart detail
    } else {
      req.cart.addProduct(productId, { through: { quantity: quantity } })
      .then(updatedCart => {
        res.send(updatedCart)
      })
      .catch(next)
    }
  })


// ** delete an item from the cart
  .delete('/:cid', (req, res, next) => {
    const productId = req.body.productId
    const products = req.cart.products
    let match

    products.forEach(product => {
      if (product.id === productId) {
        match = product
      }
    })
    .then(match => {
      match.destroy()
    })
    .then(() => {
      res.sendStatus(201)
    })
    .catch(next)
  })

// // IN PROGRESS - NEED TO COORDINATE WITH ORDER
// ** Submit a cart as an order
  .post('/:cid/submitOrder', (req, res, next) => {
    Order.create({
      status: 'processing'
    })
    .then(order => {
      req.cart.products.forEach(product => {
        order.addProduct(product, { through: { stuff: 'STUFF GOES HERE' } })
      })
    })
    .then(order => {
      res.json(order)
    })
    .catch(next)
  })
