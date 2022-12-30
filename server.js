process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const express = require('./config/express')

const app = express()

const HOST = 'localhost'
const PORT = process.env.PORT || 3000

app.listen(PORT)

console.log(`Server is running at http://${HOST}:${PORT}/`)

module.exports = app