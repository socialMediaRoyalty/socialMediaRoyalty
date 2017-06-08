'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const CartDetail = db.model('cart_details')
const Product = db.model('products')
const Order = db.model('orders')
const OrderDetail = db.model('order-details')
const User = db.model('users')

module.exports = require('express').Router()

// JUST A TESTING ROUTE
// get all carts - test to check Carts model
  .get('/', (req, res, next) => {
    User.findAll()
    .then(carts => {
      res.status(201).json(carts)
    })
    .catch(next)
  })

// find the cart and add it to req.cart
  .param('cartId', (req, res, next, cartId) => {
    CartDetail.findAll({
      where: { cart_id: cartId },
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

// get a cart by id
  .get('/:cartId', (req, res, next) => {
    res.status(201).json(req.cart)
  })

// NEEDS TESTING
// add product to cart and update quantity
  .post('/:cartId', (req, res, next) => {
    const productId = req.body.productId
    const quantity = req.body.quantity
    const cartDetails = req.cart
    let match

    cartDetails.forEach(cartDetail => {
      if (cartDetail.product_id === productId) {
        match = cartDetail
      }
    })

  // if the product is already in the cart, update quantity
    if (match) {
      match.update({ quantity: quantity })
      .then(updatedCart => res.status(201).end())
      .catch(next)
  // otherwise, create a new cart detail
    } else {
      CartDetail.create({
        cart_id: req.params.id,
        quantity: quantity,
        product_id: productId
      }).then(newCartDetail => {
        res.send(newCartDetail)
      })
      .catch(next)
    }
  })

// NEEDS TESTING
// delete an item from the cart
  .delete('/:cartId', (req, res, next) => {
    const productId = req.body.productId

    CartDetail.findOne({
      where: {
        cart_id: req.params.id,
        product_iD: productId
      }
    })
    .then(cartDetail => {
      cartDetail.destroy()
    })
    .then(() => {
      res.status(201).end()
    })
    .catch(next)
  })

// IN PROGRESS - NEED TO COORDINATE WITH ORDER
// Submit a cart as an order
  .post('/:cartId/submitOrder', (req, res, next) => {
    // get array of cartDetails
    CartDetail.findAll({
      where: { cart_id: req.params.id }
    })
    .then(cartDetails => {
      // create order
      Order.create({
        status: 'processing'
      })
    // create order detail and relationship with product
    .then(order => {
      const newOrderDetails = cartDetails.map(cartDetail => ({
        forOrderDetail: {
          purchasedPrice: cartDetail.product.price,
          quantity: cartDetail.quantity,
          order_id: order.id
        },
        product: cartDetails.product
      }))

      newOrderDetails.forEach(newOrderDetail => {
        OrderDetail.create(newOrderDetail.forOrderDetail)
        .then(createdOrderDetail => {
          createdOrderDetail.addProduct(newOrderDetail.product)
        })
        .catch(next)
      })
    })
    })
  })
