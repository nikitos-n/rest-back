const usersController = require('../controller/users')
const { routerMiddleware } = require('../utils/middleware')
const { parseRequestBody, validateBodyCredentials, checkAuth } = require('../utils/validatiors')

const userRouter = (router) => {
  router.on(
    'GET',
    '/users',
    routerMiddleware([
      checkAuth,
      async (req, res) => {
        const result = await usersController.getUsers(req, res)
        res.end(JSON.stringify(result))
      },
    ])
  )

  router.on(
    'GET',
    '/users/:userId',
    routerMiddleware([
      checkAuth,
      async (req, res, { userId }) => {
        const result = await usersController.getUserById(res, userId)
        res.end(JSON.stringify(result))
      },
    ])
  )

  router.on(
    'POST',
    '/users/register',
    routerMiddleware([
      validateBodyCredentials,
      async (req, res) => {
        const result = await usersController.createUser(req, res)
        res.end(JSON.stringify(result))
      },
    ])
  )

  router.on(
    'POST',
    '/users/auth',
    routerMiddleware([
      validateBodyCredentials,
      async (req, res) => {
        const result = await usersController.loginUser(req, res)
        res.end(JSON.stringify(result))
      },
    ])
  )

  router.on(
    'PUT',
    '/users/:userId',
    routerMiddleware([
      checkAuth,
      parseRequestBody,
      async (req, res, { userId }) => {
        const result = await usersController.updateUserById(req, res, userId)
        res.end(JSON.stringify(result))
      },
    ])
  )

  router.on(
    'DELETE',
    '/users',
    routerMiddleware([
      checkAuth,
      parseRequestBody,
      async (req, res) => {
        const result = await usersController.deleteUsers(req, res)
        res.end(JSON.stringify(result))
      },
    ])
  )

  router.on(
    'DELETE',
    '/users/:userId',
    routerMiddleware([
      checkAuth,
      async (req, res, { userId }) => {
        const result = await usersController.deleteUserById(req, res, userId)
        res.end(JSON.stringify(result))
      },
    ])
  )
}

module.exports = userRouter
