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
        include: [{
          model: Category,
          where: req.query
        }, {
          model: Review
        }]
      })
        .then(products => res.json(products))
        .catch(next))
  // create a new product
  .post('/',
    // assertAdmin,
    (req, res, next) => {
      Product.create({
        'name': req.body.name,
        'description': req.body.description,
        'price': req.body.price,
        'quantity': req.body.quantity,
        'imageUrl': req.body.imageUrl,
        'categories': req.body.categories || [] // array of category objects
      }, {
        include: [Category]
      })
        .then(createdProduct =>
          createdProduct.addCategory(req.body.categoriesId) // array of category IDs
        )
        .then(product => res.status(201).json(product))
        .catch(next)
    })
  .param('pid',
    (req, res, next, pid) =>
      Product.findOne({
        where: {
          id: pid
        },
        include: [{
          model: Category
        }, {
          model: Review // YAY -- KHLP
        }]
      })
        .then(foundProduct => {
          if (!foundProduct) {
            var err = new Error('Product Not Found')
            err.status = 404
            next(err) // throw error is what I like to see; no issue currently, but if you add code, you could run into data flow issues with 2 responses trying to be sent -- KHLP
          } else {
            req.foundProduct = foundProduct
            next()
          }
        })
        // .catch(next) === .catch((err)=>next(err))
        // no catch of errors -- KHLP
  )
  // get a product by ID
  .get('/:pid',
    (req, res, next) =>
      res.json(req.foundProduct)
  )
  // Edit a product, find the product by Id first, then edit it
  .put('/:pid',
    // assertAdmin,
    (req, res, next) => {
      req.foundProduct.update(req.body)
        .catch(next)
    })
  .delete('/:pid',
    // assertAdmin,
    (req, res, next) =>
      req.foundProduct.destroy()
        .then(() => res.sendStatus(204))
        .catch(next)
  )