'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, assertAdmin, selfOnly} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    assertAdmin,
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .post('/', // if used for signup consider who can give admin privileges, also consider who you want to login -- KHLP
    (req, res, next) =>
      User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  // router.param
  .param('id', (req, res, next, id)=> { // id === req.params.id
    // find in db
    // check if no user and send through error handling middleware 404 
    // attach requestedUser (entire object) to req (req.requestedUser = foundUser)
    // next() -- KHLP
  })
  .get('/:id',
    selfOnly, // selfOrAdmin -- KHLP
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => res.json(user)) // you don't check for no user -- KHLP
      .catch(next))
  .put('/:id',
      assertAdmin, // selfOrAdmin, but then think of setting admin privileges -- KHLP
      (req, res, next) =>
        // req.requestedUser.update instead of next 4 lines -- KHLP
        User.findById(req.params.id)
        .then(user => user.update({ // admin should be able to update all the things -- KHLP
          isAdmin: req.body.isAdmin,
        }))
        .then(updatedUser => res.json(updatedUser))
        .catch(next))
  .put('/:id', // we will never get here because we match the one ahead of us -- KHLP
    selfOnly,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => user.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        twitterLink: req.body.twitterLink,
        instagramLink: req.body.instagramLink,
        snapChatLink: req.body.snapChatLink,
        address: req.body.address,
        paypalId: req.body.paypalId,
        amazonPayId: req.body.amazonPayId
      }))
      .then(updatedUser => res.json(updatedUser))
      .catch(next))
  .delete('/:id',
    assertAdmin,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => user.destroy())
      .then(() => res.status(204).end()) // sendStatus -- KHLP
      .catch(next))
