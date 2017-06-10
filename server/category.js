'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Category = db.model('categories')
const {assertAdmin} = require('./auth.filters')

module.exports = require('express').Router()
// get all the categories
  .get('/',
    (req, res, next) =>
      Category.findAll()
        .then(categories => res.json(categories))
        .catch(next)
  )
  // create a new Category
  .post('/',
    assertAdmin,
    (req, res, next) =>
      Category.create(req.body)
        .then(categories => res.status(201).json(categories))
        .catch(next)
  )
  .param('cid',
    (req, res, next, cid) =>
      Category.findById(cid)
        .then(foundCategory => {
          if (!foundCategory) {
            var err = new Error('Category Not Found')
            err.status = 404
            next(err)
          } else {
            req.foundCategory = foundCategory
            next()
          }
        })
  )
  // get a category by ID
  .get('/:cid',
    (req, res, next) =>
      res.json(req.foundCategory)
  )
  // Edit a Category, find the category by Id first, then edit it
  .put('/pid',
    assertAdmin,
    (req, res, next) =>
      req.foundCategory.update(req.body)
        .catch(next)
  )
  // DELETE a category
  .delete('/:cid',
    assertAdmin,
    (req, res, next) =>
      req.foundCategory.destroy()
        .then(() => res.sendStatus(204))
        .catch(next)
  )
