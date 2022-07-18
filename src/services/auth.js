const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { HttpError } = require('../utils/requestResponseErrors')

const { TOKEN_KEYWORD, PASSWORD_SALT } = process.env

exports.createPasswordHash = async (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, PASSWORD_SALT, (err, hash) => {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  })

exports.checkAuthPassword = async (findUserResult, hashedPassword) => {
  console.log(findUserResult.password, hashedPassword)
  if(findUserResult.password === hashedPassword) {
    const { id, role } = findUserResult
    const token = exports.generateToken({ id, role })
    return { token }
  } else {
    console.log('authService.checkAuthPassword err')
    throw new HttpError('Unauthorized', 401)
  }
}

exports.generateToken = (userData) => {
  const token = jwt.sign(userData, TOKEN_KEYWORD, { expiresIn: '5m' })
  return token
}

exports.verifyToken = (token) => {
  const tokenData = jwt.verify(token, TOKEN_KEYWORD)
  return tokenData
}

