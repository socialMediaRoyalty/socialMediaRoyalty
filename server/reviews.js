'use strict'

const db = require('APP/db')
const Reviews = db.model('reviews')

module.exports = require('express').Router()
// get product reviews
.get('/:pid', (req, res, next) => {
  Reviews.findAll({
    where: {
      product_id: req.params.pid
    }
  }).then(reviews => {
    res.json(reviews)
  }).catch(next)
})

// post product review
.post('/', (req, res, next) => {
  Reviews.create(req.body)
  .then(review => {
    res.json(review)
  }).catch(next)
})
