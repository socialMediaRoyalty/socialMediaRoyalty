'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Category = db.model('categories')
const Review = db.model('reviews')
const {assertAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  // get all products, filter the available product in frontend
// if there is query, get the products for a query (eg, ?category_id=1)
  .get('/',
    (req, res, next) =>
      Product.findAll({
        where: req.query
      }, {
        include: [Category]
      })
        .then(products => res.json(products))
        .catch(next))
  // create a new product
  .post('/',
    assertAdmin,
    (req, res, next) => {
      // req.body.categories is an array sent from the form
      Product.create({
        'name': req.body.name,
        'description': req.body.description,
        'price': req.body.price,
        'quantity': req.body.quantity,
        'imageUrl': req.body.imageUrl,
        'categories': req.body.categories || [] // array of category objects
      }, {
        include: [Category, Review]
      })
        .then(product => res.status(201).json(product))
        .catch(next)
    })
  .param('pid',
    (req, res, next, pid) =>
      Product.findOne({
        where: {
          id: pid
        }
      }, {
        include: [Category, Review]
      })
        .then(foundProduct => {
          if (!foundProduct) {
            var err = new Error('Product Not Found')
            err.status = 404
            next(err)
          } else {
            req.foundProduct = foundProduct
            next()
          }
        })
  )
  // get a product by ID
  .get('/:pid',
    (req, res, next) =>
      res.json(req.foundProduct)
  )
  // Edit a product, find the product by Id first, then edit it
  .put('/:pid',
    assertAdmin,
    (req, res, next) => {
      req.foundProduct.update(req.body)
        .catch(next)
    })
  .delete('/:pid',
    assertAdmin,
    (req, res, next) =>
      req.foundProduct.destroy()
        .then(() => res.sendStatus(204))
        .catch(next)
  )
