const User = require('../models/user')
const { ErrorHandler } = require('../helpers/error.helper')

const EmailService = require('../services/email.service')

/**
 * @description Register new user with email and password as parameter
 * @api POST /api/auth/register
 * @access PUBLIC
 */
exports.auth_register = async (req, res, next) => {
  try {
    await User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) throw new ErrorHandler(500, 'Error')

      if (!user) {
        req.body.role = 'user'
        req.body.isActive = true

        User.create(req.body).then(async (user) => {
            const token = await user.generateAccessToken('24h')

            res.status(201).json({
              user,
              token
            })
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error
            })
          }
        )
      } else {
        return res.status(400).json({
          error: 'User already existing'
        })
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @description Login with email and password, return accessToken and refreshToken
 * @route POST /api/auth/login
 * @access PUBLIC
 */
exports.auth_login = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) throw new ErrorHandler(403, 'Email not provided!')

    const { password } = req.body
    if (!password) throw new ErrorHandler(403, 'Password not provided!')

    const user = await User.findOne({
      email: email,
      isActive: true
    })
      .select({
        _id: 1,
        email: 1,
        username: 1,
        password: 1
      })
    if (!user) throw new ErrorHandler(404, 'User not found')

    if (!(await user.comparePassword(password))) throw new ErrorHandler(401, 'Incorrect password')

    const token = await user.generateAccessToken('24h')

    res.status(200).json({
      user,
      token
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @description To get the authenticated user's profile
 * @api GET /api/auth/me
 * @access PRIVATE
 */
exports.auth_me = async (req, res) => {
  return res.status(200).json({
    user: req.currentUser
  })
}

exports.auth_reset_password = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) throw new Error('Email not provided!')

    const user = await User.findOne({
      email: email,
      isActive: true
    })

    if (!user) res.status(404).json('No user with that email')

    // generate new token
    const token = await user.generateAccessToken('1h')

    // todo
    const emailService = new EmailService()

    const message = {
      from: process.env.EMAIL_NOREPLY, // Sender address
      to: email, // List of recipients
      subject: 'Reset password', // Subject line
      text: 'Test send token:' + token // Plain text body
    }

    await emailService.sendEmail(message)

    res.status(200).json('yes')
  } catch (error) {
    next(error)
  }
}
