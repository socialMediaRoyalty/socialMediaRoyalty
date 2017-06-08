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

// const forbidden = message => (req, res) => {
//   res.status(403).send(message)
// }
const assertAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in');
  } else if (!req.user.isAdmin) {
    return res.status(403).send('You are unauthorized to view this page')
  } 
  next();
}
// Feel free to add more filters here (suggested: something that keeps out non-admins)
module.exports = {mustBeLoggedIn, selfOnly, assertAdmin}
