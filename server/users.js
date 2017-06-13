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
  .post('/',
  (req, res, next) => { // allow admin to set admin on post potentially? Or leave it like you have to create user and then upgrade -- kHLP
    // with your findOrCreate find by email and then use instance method to check password with digest password 
    User.findOrCreate({
      where: {
        email: req.body.email
      },
      defaults: {
        password: req.body.password
      }
    })
    .spread((user, created) => {
      if (created) {
        req.logIn(user, err => { // only login if not admin -- KHLP
          if (err) return next(err)
          res.json(user)
        })
      } else {
        const err = new Error('This email is already in use')
        err.status = 401
        throw err
      }
    })
    // .catch(next) !!! -- KHLP
  })
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
