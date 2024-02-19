const jwt = require('jsonwebtoken')

function signToken(input) {
  return jwt.sign(input, "secret")
}

function verifyToken(input) {
  return jwt.verify(input, "secret")
}

module.exports = {
  signToken,
  verifyToken
}