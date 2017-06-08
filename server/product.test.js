const request = require('supertest')
  , {expect} = require('chai')
  , db = require('APP/db')
  , {Category, Product} = db
  , app = require('./start')

/* global describe it before afterEach */

describe('/api/products', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({cascade: true}))

  describe('POST/GET', () => {
    describe('POST: add a new product', () => {
      it('creates a product', () =>
        request(app)
          .post('/api/products')
          .send({
            name: 'facebook 10 Likes',
            price: 1.00,
            quantity: 10,
            description: 'put 10 likes on your specified facebook post',
            ratings: 5,
            categories: [
              {id: 1, name: 'facebook'},
              {id: 2, name: 'likes'}]
          })
          .expect(201))
    })
  })
  // describe('GET /', () =>
  //   describe('get method: ', () => {
  //     var product, category
  //     before(function() {
  //       return Category.create({
  //         name: 'facebook'
  //       })
  //         .then(() => Category.create({
  //           name: 'likes'
  //         }))
  //     })
  //     before(function() {
  //       return Product.create({
  //         name: 'facebook 10 Likes',
  //         price: 1.00,
  //         quantity: 10,
  //         description: 'put 10 likes on your specified facebook post',
  //         ratings: 5,
  //         categories: [
  //           {id: 1, name: 'facebook'},
  //           {id: 2, name: 'likes'}]
  //       })
  //         .then(p => {
  //           product = p
  //         })
  //     })
  //     it('gets all the products', () =>
  //       request(app)
  //         .get(`/api/products`)
  //         .expect(200))
  //
  //     it('gets a product by id', () =>
  //       request(app)
  //         .get(`/api/products/1`)
  //         .expect(200))
  //
  //     it('gets a product that does not exist', () =>
  //       request(app)
  //         .get(`/api/products/10`)
  //         .expect(401))
  //
  //     it('gets all products for a specific category', () =>
  //       request(app)
  //         .get(`/api/products/categories/1`)
  //         .expect(200))
  //   }))
})
