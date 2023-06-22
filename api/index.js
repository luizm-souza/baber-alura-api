const express = require('express')
const passport = require('passport')
const routes = require('./routes')

const app = express()
const port = 3131

app.use(passport.initialize());

routes(app)

app.listen(port, () => console.log(`O servidor está escutando na porta ${port}`))

module.exports = app