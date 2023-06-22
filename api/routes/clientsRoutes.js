const { Router } = require('express')
const { ClientController } = require('../controllers/ClientController')
const passport = require('../middlewares/auth')

const router = Router()

router.post('/client/', ClientController.createClient)
router.post('/client/login', passport.authenticate('local', { session: false }), ClientController.loginClient);
router.delete('/client/', passport.authenticate('bearer', { session: false }), ClientController.deleteClient);

module.exports = router