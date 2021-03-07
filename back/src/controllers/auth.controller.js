const User = require('../models/user.model')

const EmailService = require('../services/email.service')

/**
 * @description Register new user with email and password as parameter
 * @api /auth/register
 * @access PUBLIC
 * @type POST
 */
exports.auth_register = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) throw new Error(err)

      if (!user) {
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
      } else {
        return res.status(400).json({
          error: 'User already existing'
        })
      }
    })
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Login with email and password, return accessToken and refreshToken
 * @route POST /auth/login
 * @access Public
 * @type POST
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

    if(!(await user.comparePassword(password))){
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    const token = await user.generateAccessToken('24h')

    res.header('auth-token', token).send({ token: token })
  } catch (error) {
    console.log(error)
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description To get the authenticated user's profile
 * @api /auth/me
 * @access Private
 * @type GET
 */
exports.auth_me = async (req, res) => {
  return res.status(200).json({
    user: req.currentUser,
  });
};

exports.auth_reset_password = async (req, res) => {
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

    console.log(process.env.EMAIL_NOREPLY)

    const message = {
      from: process.env.EMAIL_NOREPLY, // Sender address
      to: email, // List of recipients
      subject: 'Reset password', // Subject line
      text: 'Test send token:' + token // Plain text body
    }

    await emailService.sendEmail(message)

    res.status(200).json('yes')
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}
