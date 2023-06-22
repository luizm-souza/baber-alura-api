const { Router } = require('express')
const EmployeeController = require('../controllers/EmployeeController')

const router = Router()

router.get('/employees/', EmployeeController.getEmployees)
router.delete('/employees/:id', EmployeeController.deleteEmployee)

module.exports = router