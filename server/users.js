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
  .post('/',
    (req, res, next) =>
      User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id',
    selfOnly,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
  .put('/:id',
      assertAdmin,
      (req, res, next) =>
        User.findById(req.params.id)
        .then(user => user.update({
          isAdmin: req.body.isAdmin,
        }))
        .then(updatedUser => res.json(updatedUser))
        .catch(next))
  .put('/:id',
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
      .then(() => res.status(204).end())
      .catch(next))
