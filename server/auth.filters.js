const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

const assertAdmin = (req, res, next) => {
  if (!req.user) {
    var err = new Error('not logged in')
    err.status = 401;
    next(err)
  } else if (req.user.isAdmin) {
    next()
  } else {
    var err = new Error('not an admin')
    err.status = 403
    next(err)
  }
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)

module.exports = {mustBeLoggedIn, selfOnly, forbidden}
