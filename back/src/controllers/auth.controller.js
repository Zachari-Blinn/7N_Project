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

/**
 * @description Login with email and password, return accessToken and refreshToken
 * @param {*} req
 * @param {*} res
 */
exports.auth_login = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) throw new Error('Email not provided!')

    const { password } = req.body
    if (!password) throw new Error('Password not provided!')

    const user = await User.findOne({
      email: email,
      isActive: true
    })
      .select({
        _id: 1,
        password: 1
      })
    if (!user) throw new Error('User not found!')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Password and Email incorrect!')

    const token = generateAccessToken({ id: user._id })

    res.header('auth-token', token).send({ token: token })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error on the server')
  }
}

function generateAccessToken (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
};
