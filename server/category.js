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
        .then(categories => res.status(200).json(categories))
        .catch(next))
  // create a new Category
  .post('/',
    assertAdmin,
    (req, res, next) =>
      Category.create(req.body)
        .then(categories => res.status(201).json(categories))
        .catch(next))
  // get a category by ID
  .get('/:cid',
    (req, res, next) =>
      Category.findById(req.params.cid)
        .then(category => res.status(200).json(category))
        .catch(next))
  // Edit a Category, find the category by Id first, then edit it
  .put('/',
    assertAdmin,
    (req, res, next) =>
      Category.findById(req.body.cid)
        .then(category => {
          var name = req.body.name
          if (!category) {
            var err = new Error('Product Not Found')
            err.status = 404
            throw err
          } else {
            if (name) {
              category.name = name
            }
            category.save()
              .then(updatedCategory => {
                res.status(204).json(updatedCategory)
              })
          }
        })
        .catch(next))
  // DELETE a category
  .delete('/:cid',
    assertAdmin,
    (req, res, next) =>
      Category.findById(req.params.cid)
        .then(category => {
          if (!category) {
            var err = new Error('Category not found')
            err.status = 404
            throw err
          } else {
            Category.destroy({
              where: {id: req.params.cid}
            })
              .then(() => res.status(200).json('deleted'))
          }
        })
  )
