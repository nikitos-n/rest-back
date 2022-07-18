const router = require('find-my-way')()

const petsRouter = require('./pets')
const usersRouter = require('./users')

petsRouter(router)
usersRouter(router)

module.exports = router
