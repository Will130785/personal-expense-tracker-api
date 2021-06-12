const configExpress = require('./config_express')
const startExpress = require('./start_express')
const dbConnect = require('./dbConnect')

module.exports = async (app) => {
  // Connect to db
  dbConnect()
  // Configure express
  await configExpress(app)
  // Start express application
  await startExpress(app)
}
