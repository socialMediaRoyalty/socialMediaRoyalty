const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.uid !== req.user.id) {
    return res.status(403).json(`You can only ${action} yourself.`)
  }
  next()
}

// const forbidden = message => (req, res) => {
//   res.status(403).send(message)
// }

const assertSelfOrAdmin = (req, res, next) => {
  if(!req.user) {
    return res.status(401).json('You must be logged in')
  } else if (!req.user.isAdmin && req.requestedUser.dataValues.id !== req.user.dataValues.id) {
    return res.status(403).json('You are unauthorized to view this page test')
  }
  next()
}

const assertAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json('You must be logged in')
  } else if (!req.user.isAdmin) {
    return res.status(403).json('You are unauthorized to view this page')
  } 
  next()
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)
module.exports = {mustBeLoggedIn, selfOnly, assertAdmin, assertSelfOrAdmin}
