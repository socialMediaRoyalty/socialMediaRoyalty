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
          .get(`/api/reviews/1`) // where is your beforeEach where make the review you are finding? -- KHLP
          .expect(200) // check body not jsut status -- KHLP
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
          .expect(200)) // a good test would look at the body and make comparisons (check out wikistack testing solution for examples), also expect a 201 created -- KHLP
    }))
})
