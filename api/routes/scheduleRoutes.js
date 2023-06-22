const { Router } = require('express')
const ScheduleController = require('../controllers/ScheduleController')
const passport = require('../middlewares/auth')

const router = Router()

router.get('/schedules/', ScheduleController.getSchedules)
router.get('/schedules/user', passport.authenticate('bearer', { session: false }), ScheduleController.getByclientIdSchedules)
router.post('/schedule/', passport.authenticate('bearer', { session: false }), ScheduleController.createSchedule)
router.delete('/schedule/user/:id', passport.authenticate('bearer', { session: false }), ScheduleController.deleteSchedule)

module.exports = router