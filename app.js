require('dotenv').load()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const path = require('path')
const morgan = require('morgan')
const socket = require('socket.io')
const validator = require('express-validator')
const uws = require('uws')

const validateFormat = require('./app/helpers/validate')

const datasource = require('./app/databases/mysql')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(validator(validateFormat))
app.use(morgan('dev'))
app.use(cors())

const port = process.env.PORT

const server = http.createServer(app)
const io = socket.listen(server)
const uwsEngine = new uws.Server({
    noServer: process.env.SOCKET_NO_SERVER,
    clientTracking: process.env.SOCKET_CLIENTTRACKING,
    perMessageDeflate: process.env.SOCKET_PERMESSAGEDEFLATE
})

io.engine.ws = uwsEngine

app.datasource = datasource(app)
app.jwt = require('./app/helpers/jwt')(app).validate

app.use((req, res, next) => {
    res.io = io
    res.set('X-Powered-By', ': P')
    next()
})

require('./routes')(app)

app.use((req, res) => res.status(404).json([{
    title: '404', message: 'Route not found'
}]))

server.listen(port)

module.exports = app
