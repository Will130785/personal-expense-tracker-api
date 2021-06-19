const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

// Routes
const routes = require(`${global.APP_ROOT}/routes`)

module.exports = async (app) => {
  // Config body parser
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  // Apply cors
  app.use(cors())
  // Config passport
  app.use(passport.initialize())
  require('./passport')(passport)

  // Add custom header to all responses - useful for testing responses
  app.use(function (req, res, next) {
    res.set('Test-Header', 0)
    next()
  })

  // init routes
  app.use('/', routes)

  return app
}
