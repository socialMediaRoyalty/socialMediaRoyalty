/* eslint-disable no-trailing-spaces */
'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, BOOLEAN} = require('sequelize')

module.exports = db => db.define('users', {
  name: STRING,
  email: {
    type: STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    }
  },

    // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL, // Note that this is a virtual, and not actually stored in DB
  isAdmin: BOOLEAN,
  facebookLink: {
    type: STRING,
    validate: {
      isUrl: true
    }
  },
  twitterLink: {
    type: STRING,
    validate: {
      isUrl: true
    }
  },
  instagramLink: {
    type: STRING,
    validate: {
      isUrl: true
    }
  },
  snapChatLink: {
    type: STRING,
    validate: {
      isUrl: true
    }
  },
  address: STRING,
  paypalId: {
    type: STRING,
    validate: {
      isEmail: true
    }
  },
  amazonPayId: {
    type: STRING,
    validate: {
      isEmail: true
    }
  }
}, {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  defaultScope: {
    attributes: {exclude: ['password_digest']}
  },
  instanceMethods: {
      // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return bcrypt.compare(plaintext, this.password_digest)
    }
  }
})

module.exports.associations = (User, {OAuth, Thing, Favorite}) => {
  User.hasOne(OAuth)
  User.belongsToMany(Thing, {as: 'favorites', through: Favorite})
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
}
