'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Category = db.model('categories')

module.exports = require('express').Router()
// get all the products
  .get('/',
    (req, res, next) =>
      Product.findAll()
        .then(products => res.status(200).json(products))
        .catch(next))
  // create a new product
  .post('/',
    (req, res, next) =>
      Product.create(req.body)
        .then(products => res.status(201).json(products))
        .catch(next))
  // get a product by ID
  .get('/:pid',
    (req, res, next) =>
      Product.findById(req.params.pid)
        .then(product => res.status(200).json(product))
        .catch(next))
  // get all products for a specific category
  .get('/categories/:cid',
    (req, res, next) =>
      Product.findAll({
        include: [{
          model: Category,
          where: { category_id: req.params.cid }
        }]
      })
        .then(products => res.status(201).json(products))
        .catch(next))
  // Edit a product, find the product by Id first, then edit it
  .put('/',
    (req, res, next) => Product.findById(req.body.pid)
        .then(product => {
          var name = req.body.name
          var description = req.body.description
          var price = req.body.price
          var quantity = req.body.quantity
          var ratings = req.body.ratings
          var imageUrl = req.body.imageUrl
          if (!product) {
            var err = new Error('Product Not Found')
            err.status = 404
            throw err
          } else {
            if (name) {
              product.name = name
            }
            if (description) {
              product.description = description
            }
            if (price) {
              product.price = price
            }
            if (quantity) {
              product.quantity = quantity
            }
            if (ratings) {
              product.ratings = ratings
            }
            if (imageUrl) {
              product.imageUrl = imageUrl
            }
            product.save()
              .then(updatedProduct => {
                res.status(204).send(updatedProduct)
              })
          }
        })
        .catch(next))
