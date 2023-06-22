const { Router } = require('express')
const ServiceController = require('../controllers/ServiceController')

const router = Router()

router.get('/services/', ServiceController.getServices)

module.exports = router