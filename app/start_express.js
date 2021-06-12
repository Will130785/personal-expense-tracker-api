const { env: { CUSTOM_PORT } = {} } = process
// Same as below
// const { CUSTOM_PORT } = process.env
const pjson = require(`${global.APP_ROOT}/package.json`)
const listEndpoints = require('express-list-endpoints')

module.exports = async (app) => {
  // Attempt to start express
  try {
    const http = require('http').Server(app)
    await http.listen(CUSTOM_PORT)
  } catch (err) {
    console.log(`Unable to create app: ${err}`)
    process.exit(1)
  }

  // Output custom variables and NODE_ENV
  let constantsOutput = ''
  for (const key of Object.keys(process.env)) {
    if (key.substring(0, 6) === 'CUSTOM') {
      constantsOutput += `>> ${key.substring(7)} : ${process.env[key]}`
    }
    if (key === 'NODE_ENV') {
      constantsOutput += `>> ${key} : ${process.env[key]}`
    }
  }
  let routesOutput = ''
  for (const obj of listEndpoints(app)) {
    routesOutput += `http://localhost:${process.env.CUSTOM_PORT}${obj.path}  [${obj.methods.join(' ')}]`
  }
  console.log(`${pjson.name} Started with the following environment variables ${constantsOutput}`)
  console.log(`${pjson.name} Started with the following routes ${routesOutput}`)

  return app
}
