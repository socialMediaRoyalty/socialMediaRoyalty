// const mustBeLoggedIn = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json('You must be logged in')
//   }
//   next()
// }

const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    const err = new Error('You must be logged in')
    err.status = 401
    throw err
  }
  next()
}

// const selfOnly = action => (req, res, next) => {
//   if (req.params.uid !== req.user.id) {
//     return res.status(403).json(`You can only ${action} yourself.`)
//   }
//   next()
// }

const selfOnly = action => (req, res, next) => {
  if (req.params.uid !== req.user.id) {
    const err = new Error(`You can only ${action} yourself.`)
    err.status = 403
    throw err
  }
  next()
}

// const forbidden = message => (req, res) => {
//   res.status(403).send(message)
// }

// const assertSelfOrAdmin = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json('You must be logged in')
//   } else if (!req.user.isAdmin && req.requestedUser.dataValues.id !== req.user.dataValues.id) {
//     return res.status(403).json('You are unauthorized to view this page')
//   }
//   next()
// }

const assertSelfOrAdmin = (req, res, next) => {
  if (!req.user) {
    const err = new Error('You must be logged in')
    err.status = 401
    throw err

  } else if (!req.user.isAdmin && req.requestedUser.dataValues.id !== req.user.dataValues.id) {
    const err = new Error('You are unauthorized to view this page')
    err.status = 403
    throw err
  }
  next(0)
}

// const assertAdmin = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json('You must be logged in')
//   } else if (!req.user.isAdmin) {
//     return res.status(403).json('You are unauthorized to view this page')
//   }
//   next()
// }

const assertAdmin = (req, res, next) => {
  if (!req.user) {
    const err = new Error('You must be logged in')
    err.status = 401
    next(err)
  } else if (!req.user.isAdmin) {
    const err = new Error('You are unauthorized to view this page')
    err.status = 403
    next(err)
  }
  next()
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)
module.exports = {mustBeLoggedIn, selfOnly, assertAdmin, assertSelfOrAdmin}
