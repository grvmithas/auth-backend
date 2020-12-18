const jwt = require('jsonwebtoken')
var constants = require('../constants')

function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch (error) {
    res.status(401).json({ message: constants.TIMEOUT_MESSAGE })
  }
}
module.exports = { authenticate }