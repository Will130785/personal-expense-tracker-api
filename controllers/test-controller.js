module.exports.testController = (req, res, next) => {
  console.log(req)
  res.send('You have hit the test controller')
}
