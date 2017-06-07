var router = require('express').Router()
var Reviews = require('APP/db/models/review')

// get product reviews
router.get('/:id/reviews', (req, res, next) => {
  Reviews.findAll({
    where: {
      productId: req.params.id
    }
  }).then(reviews => {
    res.send(reviews)
  }).catch(next)
}) 

// post product review
router.post('/:id', (req, res, next) => {
  Reviews.create(req.body)
  .then(review => {
    res.send(review)
  }).catch(next)
})
