'use strict'

const db = require('APP/db')
const Reviews = db.model('reviews')

module.exports = require('express').Router()
// get product reviews
.get('/:pid', (req, res, next) => { // this should be in product route or you could use query -- KHLP
  // selecting a single review is sensical here -- KHLP
  // `/api/reviews?product_id=1` ==> .get('/') would match this -- KHLP
    // Reviews.findAll({where: req.query })
  Reviews.findAll({
    where: {
      product_id: req.params.pid
    }
  }).then(reviews => {
    res.send(reviews) // consistency on send vs json -- KHLP
  }).catch(next)
})

// post product review
.post('/', (req, res, next) => { // can not logged in user post a review? -- KHLP
  Reviews.create(req.body)
  .then(review => {
    res.send(review)
  }).catch(next)
})
