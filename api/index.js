const express = require('express')
require('dotenv').config()
const passport = require('passport')
const routes = require('./routes')

const app = express()
const port = process.env.PORT

app.use(passport.initialize());

routes(app)

app.listen(port,'0.0.0.0', () => console.log(`O servidor está escutando na porta ${port}`))

module.exports = app