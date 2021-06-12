const { env: { CUSTOM_MONGO_DB, NODE_ENV, CUSTOM_MONGO_DEBUG } = {} } = process
const mongoose = require('mongoose')

module.exports = async () => {
  // Mongo db connection
  await mongoose.connect(CUSTOM_MONGO_DB, {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  CUSTOM_MONGO_DEBUG === 'true' && mongoose.set('debug', true)
  console.log(`${process.env.CUSTOM_MONGO_DB} Connected`)
  return
}
