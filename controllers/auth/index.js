module.exports.login = async (req, res, next) => {
  console.log(req.body)
  // Get data from body
  const data = {
    user: req.body,
    token: true
  }
  res.send(data)
}
