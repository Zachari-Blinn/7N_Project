const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

/**
 * @description Register new user with email and password as parameter
 * @param {*} req
 * @param {*} res
 */
exports.auth_register = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) throw new Error(err)

      if (!user) {
        await bcrypt.hash(req.body.password, 10, (_err, cryptedPassword) => {
          req.body.password = cryptedPassword
          req.body.role = 'user'
          req.body.isActive = true

          User.create(req.body).then(
            (user) => {
              res.status(201).json({
                user
              })
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error
              })
            }
          )
        })
      } else {
        return res.status(400).json({
          error: 'User already existing'
        })
      }
    })
  } catch (error) {
    res.status(500).send('Error on the server')
  }
}

let refreshTokens = []

/**
 * @description This function take the token as parameter, return accessToken
 * @param {*} req
 * @param {*} res
 */
exports.auth_token = async (req, res) => {
  try {
    const refreshToken = req.body.token

    if (refreshToken == null) throw new Error('Forbiden!')

    if (!refreshTokens.includes(refreshToken)) throw new Error('Forbiden!')

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)

      const accessToken = generateAccessToken({ name: user.name })

      res.json({ accessToken: accessToken })
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error on the server')
  }
}

exports.auth_logout = (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)

  res.sendStatus(204)
}

/**
 * @description Login with email and password, return accessToken and refreshToken
 * @param {*} req
 * @param {*} res
 */
exports.auth_login = async (req, res) => {
  const email = req.body.email
  const user = { email: email }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

  refreshTokens.push(refreshToken)

  res.json({ accessToken: accessToken, refreshToken: refreshToken })
}

function generateAccessToken (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
};
