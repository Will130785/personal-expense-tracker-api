const express = require('express')
const router = express.Router()
const { testController } = require(`${global.APP_ROOT}/controllers/test-controller`)

router.get('/test', testController)

module.exports = router
