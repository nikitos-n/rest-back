require('dotenv').config()
const { createServer } = require('http')

const { sequelize } = require('./services/db/models')
// const router = require('./routes')

const { PORT, HOST, NODE_ENV } = process.env

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')
    // router.lookup(req, res)
})

async function main() {
    try {
        await sequelize.sync({ force: false })
        console.log('Connection has been established successfully.')
        
        server.listen(PORT, HOST, () => {
            console.log(`Server is listening on ${PORT} port`)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

main()
