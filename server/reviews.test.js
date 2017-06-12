const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start')

/* global describe it before afterEach */

describe('/api/reviews', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('GET /:pid', () =>
    describe('getting product reviews', () =>
      it('retrieves all reviews for a product', () =>
        request(app)
          .get(`/api/reviews/1`)
          .expect(200)
      )))

  describe('POST', () =>
    describe('creating a new review', () => {
      it('user creates a new review for a product', () =>
        request(app)
          .post('/api/reviews')
          .send({
            rating: 5,
            comment: 'Incredible!'
          })
          .expect(200))
    }))
})
