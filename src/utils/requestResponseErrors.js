class HttpError extends Error {
  constructor(message = 'Internal error', statusCode = 500) {
    super(message)
    this.message = message
    this.statusCode = statusCode
  }
}

exports.HttpError = HttpError
