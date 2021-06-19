const express = require('express')
const router = express.Router()
const { auth } = require(`${global.APP_ROOT}/controllers`)

router.post('/login', auth.login)

module.exports = router
