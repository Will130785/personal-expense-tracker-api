const express = require('express')
const router = express.Router()
const { auth } = require(`${global.APP_ROOT}/controllers`)

router.get('/login', auth.login)

module.exports = router
