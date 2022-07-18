const petsController = require('../controller/pets')
const { routerMiddleware } = require('../utils/middleware')
const { parseRequestBody, checkAuth } = require('../utils/validatiors')

const catRouter = (router) => {
  router.on(
    'GET',
    '/pets',
    routerMiddleware([
      async (req, res) => {
        const result = await petsController.getPets(res)
        res.end(JSON.stringify(result))
      },
    ])
  )

  router.on(
    'GET',
    '/pets/:catId',
    routerMiddleware([
      async (req, res, { catId }) => {
        const result = await petsController.getPetById(res, catId)
        res.end(JSON.stringify(result))
      },
    ])
  )

  router.on(
    'POST',
    '/pets',
    routerMiddleware([
      checkAuth,
      parseRequestBody,
      async (req, res) => {
        const result = await petsController.createPet(req, res)
        res.end(JSON.stringify(result))
      },
    ])
  )

  router.on(
    'PUT',
    '/pets/:catId',
    routerMiddleware([
      checkAuth,
      parseRequestBody,
      async (req, res, { catId }) => {
        const result = await petsController.updatePetById(req, res, catId)
        res.end(JSON.stringify(result))
      },
    ])
  )

  router.on(
    'DELETE',
    '/pets/:catId',
    routerMiddleware([
      checkAuth,
      async (req, res, { catId }) => {
        const result = await petsController.deletePetById(res, catId)
        res.end(JSON.stringify(result))
      },
    ])
  )
}

module.exports = catRouter
