const express = require('express')
const router = express.Router()
const { auth } = require(`${global.APP_ROOT}/controllers`)
const passport = require('passport')

router.post('/login', auth.login)
router.post('/register', passport.authenticate('jwt', { session: false }), auth.register)

module.exports = router
