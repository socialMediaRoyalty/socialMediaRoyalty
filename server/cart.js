'use strict'

const db = require('APP/db')
const Cart = db.model('carts')
const CartDetail = db.model('cart_details')
const Product = db.model('products')
const Order = db.model('orders')
const OrderDetail = db.model('order-details')

module.exports = require('express').Router()

// get all carts - test to check Carts model
  .get('/', (req, res, next) => {
    Cart.findAll()
    .then(carts => {
      res.json(carts)
    })
    .catch(next)
  })

// find the cart and add it to req.cart
  .param('/:cartId', (req, res, next, cartId) => {
    Cart.findOne({
      where: { id: req.params.cartId },
      include: [
        {
          model: CartDetail,
          include: [
            {
              model: Product
            }
          ]
        }]
    })
    .then(cart => {
      if (cart) req.cart = cart
      next()
    })
    .catch(next)
  })

// get a cart by id
  .get('/:cartId', (req, res, next) => {
    console.log(req.cart)
    res.status(201).json(req.cart)
  })

// add product(s) to cart and update quantity
  .post('/:cartId', (req, res, next) => {
    const productId = req.body.productId
    const quantity = req.body.quantity
    let match

    req.cart.cart_details.forEach(cartDetail => {
      if (cartDetail.product.id === productId) {
        match = cartDetail
      }
    })

    if (match) {  // if the product is already in the cart, update quantity
      match.update({ quantity: quantity })
      .then(updatedCart => res.status(201).end())
      .catch(next)
    } else {   // otherwise, create a new cart detail
      CartDetail.create({
        cart_id: req.params.id,
        quantity: quantity
      }).then(newCartDetail => {
        newCartDetail.addProduct(productId) // NOT SURE IF THIS IS HOW YOU DO IT
      })
      .catch(next)
    }
  })

// delete an item from the cart
  .delete('/:cartId', (req, res, next) => {
    const productId = req.body.productId

    CartDetail.findOne({
      where: {
        cart_id: req.params.id,
        productID: productId
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

// Submit a cart as an order
  .post('/:cartId/submitOrder', (req, res, next) => {
    // get array of cartDetails
    const cartDetails = req.cart.cart_details

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

