const bodyParser = require('body-parser')
const clients = require('./clientsRoutes')
const services = require('./servicesRoutes')
const employees = require('./employeesRoutes')
const schedule = require('./scheduleRoutes')

module.exports = app => {
    app.use(bodyParser.json(), clients, services, employees, schedule)
}