const User = require(`${global.APP_ROOT}/models/User`)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = require(`${global.APP_ROOT}/app/keys`).secret

module.exports.login = async (req, res, next) => {
  // get data from body
  const data = req.body
  try {
    User.findOne({ username: data.username })
      .then(user => {
        if (!user) {
          console.log('username not found')
          return res.json({
            success: false,
            msg: 'Username not found'
          })
        }

        // If there is a user we will compare the password
        bcrypt.compare(data.password, user.password)
          .then(isMatch => {
            if (isMatch) {
              // Users password is correct and we send the json webtoken
              const payload = {
                _id: user._id,
                username: user.username
              }
              jwt.sign(payload, key, {
                expiresIn: 604800
              }, (err, token) => {
                if (err) {
                  res.json({
                    success: false,
                    msg: 'There was an error logging you in'
                  })
                } else {
                  res.json({
                    success: true,
                    user: user,
                    token: `Bearer ${token}`,
                    msg: 'You are now logged in'
                  })
                }
              })
            } else {
              console.log('username taken')
              return res.json({
                success: false,
                msg: 'Incorrect password'
              })
            }
          })
      })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      msg: 'Error with request',
      error: err
    })
  }
}

module.exports.register = async (req, res, next) => {
  // Get data from body
  const data = req.body
  try {
    // Check password and passwordConfirm match
    if (data.password !== data.passwordConfirm) {
      return res.json({
        success: false,
        msg: 'Passwords do not match'
      })
    } else {
      User.findOne({
        username: data.username
      })
        .then(user => {
          if (user) {
            console.log('username taken')
            return res.json({
              msg: 'Username already taken',
              success: false
            })
          }

          // Data is valid and we can register user
          const newUser = new User(data)

          // Hash password
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              res.json({
                success: false,
                msg: 'Error processing password'
              })
            } else {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  res.json({
                    success: false,
                    msg: 'Error processing password'
                  })
                } else {
                  newUser.password = hash
                  newUser.save()
                    .then(user => {
                      return res.status(200).json({
                        success: true,
                        msg: 'User is now registered'
                      })
                    })
                }
              })
            }
          })
        })
    }
  } catch (err) {
    console.log(err)
    res.json({
      msg: 'Error with request',
      error: err,
      success: false
    })
  }
}
