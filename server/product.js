'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Category = db.model('categories')
const {assertAdmin} = require('./auth.filters')

module.exports = require('express').Router()
// get all the products
// if no delete and you only want to show inventory > 0 make a scope for that in your model and include it in your queries here -- KHLP
  .get('/',
    (req, res, next) =>
      Product.findAll()
        .then(products => res.status(200).json(products)) // 200 is default don't need -- KHLP
        .catch(next))
  // create a new product
  .post('/',
    (req, res, next) => { // who should be able to do this? -- kHLP
      // req.body.categories is an array sent from the form
      // const {name, description, price, quantity, ratings, imageUrl, categories} = req.body;
      // Product.create({name, description, price, quantity, ratings, imageUrl, categories: categories || [] }) -- just a though KHLP
      Product.create({
        'name': req.body.name,
        'description': req.body.description,
        'price': req.body.price,
        'quantity': req.body.quantity,
        'ratings': req.body.ratings,
        'imageUrl': req.body.imageUrl,
        'categories': req.body.categories || [] // array of catagory objects
      }, {
        // include: [Category] I think we can do this -- KHLP
        include: [{
          model: Category,
          as: 'categories'
        }]
      })
        .then(product => res.status(201).json(product))
        .catch(next)
    })
  // get a product by ID
  // router.param for pid (check out users for example) -- KHLP
  .get('/:pid', // consistency with users -- KHLP
    // get all reviews for a single product I would think query and scope or just always include reviews by default in this route
      // Product.findById(req.params.pid, {include: [Reviews]}) can only do this if you have the sequelize reviews -- KHLP
      // or with query `/api/products/1?reviews=true`
    (req, res, next) =>
      Product.findById(req.params.pid)
        .then(product => {
          if (!product) {
            var err = new Error('product not found')
            err.status = 404
            throw err
          } else {
            res.status(200).json(product) // 200 default -- KHLP
          }
        })
        .catch(next))
  // get all products for a specific category
  .get('/categories/:cid', // should be in category route or query on findall products `/api/products?category=1` -- KHLP
    (req, res, next) =>
      Product.findAll({
        include: [{
          model: Category,
          where: { id: req.params.cid }
        }]
      })
        .then(products => res.status(201).json(products)) // 201 created makes no sense here -- KHLP
        .catch(next))
  // Edit a product, find the product by Id first, then edit it
  .put('/', // pid should be a param -- KHLP
    // assertAdmin, // comment in -- KHLP
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
            err.status = 401
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

            // consider Object.assign(product, req.body) or even just if you are using router.param --> req.product.update(req.body)
            product.save()
              .then(updatedProduct => {
                res.status(204).send(updatedProduct) // 204 no body makes no sense here -- KHLP
              })
          }
        })
        .catch(next))
