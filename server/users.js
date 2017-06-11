'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, assertAdmin, selfOnly, assertSelfOrAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .param('uid', (req, res, next, uid) => {
    User.findById(uid)
    .then(user => {
      if (!user) {
        const err = new Error('You are not authorized to view this page')
        err.status = 403
        throw err
      } else {
        req.requestedUser = user
        next()
      }
    })
  })
  .get('/',
    assertAdmin,
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .get('/:uid',
    assertSelfOrAdmin,
    (req, res, next) =>
      res.json(req.requestedUser)
      .catch(next))
  .put('/:uid',
      assertSelfOrAdmin,
      (req, res, next) => {
        if (req.user.isAdmin) {
          req.requestedUser.update(req.body)
          .then(user => res.status(201).json(user))
          .catch(next)
        } else {
          req.requestedUser.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            twitterLink: req.body.twitterLink,
            instagramLink: req.body.instagramLink,
            snapChatLink: req.body.snapChatLink,
            address: req.body.address,
            paypalId: req.body.paypalId,
            amazonPayId: req.body.amazonPayId
          })
          .then(user => res.status(201).json(user))
          .catch(next)
        }
      })
  .delete('/:uid',
    assertAdmin,
    (req, res, next) =>
      req.requestedUser.destroy()
      .then(() => res.sendStatus(204).end())
      .catch(next))
