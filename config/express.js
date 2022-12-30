require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const expressSession = require('express-session')
const cors = require('cors')
const passport = require('passport')
const connectMongo = require('connect-mongo')

module.exports = function (){
    const app = express()

    if (process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'))
    } else if ((process.env.NODE_ENV === 'production')){
        app.use(compression())
    }

    require('./mongoose')(app)

    const sessionApp = connectMongo.create({
        mongoUrl: process.env.db,
        autoRemove: 'interval',
        autoRemoveInterval: 10,
        collectionName: 'sessions'
    })

    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(bodyParser.json())
    app.use(methodOverride())

    app.use(expressSession({
        saveUninitialized: true,
        resave: true,
        secret: process.env.sessionSecret,
        store: sessionApp,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    }))

    require('./passport')(passport)

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(cors())

    app.use(express.static('./public'))

    // Routes
    require('../app/routes/index.server.routes')(app)
    require('../app/routes/user.server.routes')(app)

    return app
}