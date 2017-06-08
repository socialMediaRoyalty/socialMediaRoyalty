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
        .then(categories => res.status(200).json(categories)) // 200 is default -- KHLP
        .catch(next))
  // create a new Category
  .post('/',
    // assertAdmin,
    (req, res, next) => {
      console.log('>>>>>>>>>>>', req.body) // logs :/ -- KHLP
      Category.create(req.body, {
        include: [{ // take me out -- KHLP
          model: Product,
          as: 'products'
        }]
      })
        .then(categories => res.status(201).json(categories))
        .catch(next)
    })
  // get a category by ID
  // router.param (see user for example) -- KHLP
  .get('/:cid', // consistency with user param id -- KHLP
    (req, res, next) =>
      Category.findById(req.params.cid)
        .then(category => res.status(200).json(category))
        .catch(next))
  // Edit a Category, find the category by Id first, then edit it
  .put('/', // use params -- KHLP
    // assertAdmin, // comment in -- KHLP
    (req, res, next) =>
      Category.findById(req.body.cid) // no -- KHLP
        .then(category => {
          var name = req.body.name
          if (!category) {
            var err = new Error('Product Not Found') // this is exactly what we want in the router.param -- KHLP
            err.status = 401 // 404 not found -- KHLP
            throw err
          } else {
            if (name) {
              category.name = name
            }
            // req.category.update(req.body) -- KHLP
            category.save() // return this promise -- KHLP
              .then(updatedCategory => { // no no nested .then -- KHLP
                res.status(204).json(updatedCategory) // 204 no body makes no sense 200 is fine -- KHLP
              })
          }
        })
        .catch(next))
  // DELETE a category
  .delete('/:cid',
    // assertAdmin,
    (req, res, next) =>
      Category.findById(req.params.cid)
        .then(category => {
          if (!category) {
            var err = new Error('Category not found')
            err.status = 401
            throw err
          } else {
            Category.destroy({ // you find the instance so use the destroy instance method. Also return so you don't nest .then -- KHLP
              where: {id: req.params.cid}
            })
              .then(() => res.status(200).json('deleted')) // sendStatus(204)
          }
        })
  )
