const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const EmailService = require('../services/email.service')

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
    res.status(500).json(`Error: ${error}`)
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

    const token = generateAccessToken({ id: user._id }, '24h')

    res.header('auth-token', token).send({ token: token })
  } catch (error) {
    console.log(error)
    res.status(500).json(`Error: ${error}`)
  }
}

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
    const token = generateAccessToken({ id: user._id }, '1h')

    // todo
    const emailService = new EmailService();

    console.log(process.env.EMAIL_NOREPLY);

    const message = {
      from: process.env.EMAIL_NOREPLY, // Sender address
      to: email,         // List of recipients
      subject: 'Reset password', // Subject line
      text: 'Test send token:' + token // Plain text body
    };

    await emailService.sendEmail(message);

    res.status(200).json('yes');

  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

function generateAccessToken(user, expiresIn) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIn })
};
