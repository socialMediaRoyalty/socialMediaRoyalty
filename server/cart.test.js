const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start')

/* global describe it before afterEach */

describe('/api/cart', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('GET /', () =>
    describe('test getting all carts', () =>
      it('gets all carts', () =>
        request(app)
          .get(`/api/cart`)
          .expect(201)
      )))

  // describe('POST', () =>
  //   describe('when not logged in', () => {
  //     it('creates a user', () =>
  //       request(app)
  //         .post('/api/users')
  //         .send({
  //           email: 'beth@secrets.org',
  //           password: '12345'
  //         })
  //         .expect(201))

  //     it('redirects to the user it just made', () =>
  //       request(app)
  //         .post('/api/users')
  //         .send({
  //           email: 'eve@interloper.com',
  //           password: '23456',
  //         })
  //         .redirects(1)
  //         .then(res => expect(res.body).to.contain({
  //           email: 'eve@interloper.com'
  //         })))
  //   }))
})
