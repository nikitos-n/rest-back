const { HttpError } = require('./requestResponseErrors')
const { parseJsonBody } = require('../utils/parseJsonData')
const authService = require('../services/auth')

exports.parseRequestBody = async (req) => {
  const body = await parseJsonBody(req)
  req.body = body
}

exports.validateBodyCredentials = async (req) => {
  const body = await parseJsonBody(req)
  if (!body || !body.email || !body.password) {
    throw new HttpError('Email and password is required.', 400)
  }
  req.body = body
}

exports.checkAuth = (req) => {
  const { authorization } = req.headers
  if (!authorization) {
    throw new HttpError('Unauthorized', 401)
  }
  try {
    const [_, token] = authorization.split(' ')
    req.user = authService.verifyToken(token)
  } catch (err) {
    throw new HttpError('Unauthorized', 401)
  }
}
