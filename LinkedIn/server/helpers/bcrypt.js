const bcrypt = require('bcryptjs')

function hashPassword(password) {
  return bcrypt.hashSync(password)
}

function comparePassword(input, hash) {
  return bcrypt.compareSync(input, hash)
}

module.exports = {
  hashPassword,
  comparePassword
}