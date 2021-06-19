const express = require('express')
const router = express.Router()
// const { testController } = require(`${global.APP_ROOT}/controllers/test-controller`)

// Auth
router.use('/', require(`${global.APP_ROOT}/routes/auth`))

module.exports = router
