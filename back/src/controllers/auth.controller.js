const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * @desc User register
 * @route POST /auth/register
 */
exports.auth_register = async (req, res) => {
  try {
    // eslint-disable-next-line consistent-return
    await User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) throw new Error(err);

      if (!user) {
        await bcrypt.hash(req.body.password, 10, (_err, cryptedPassword) => {
          req.body.password = cryptedPassword;
          req.body.role = 'user';
          req.body.isActive = true;

          User.create(req.body).then(
            // eslint-disable-next-line no-shadow
            (user) => {
              res.status(201).json({
                user,
              });
            },
          ).catch(
            (error) => {
              res.status(500).json({
                error,
              });
            },
          );
        });
      } else {
        return res.status(400).json({
          error: 'User already existing',
        });
      }
    });
  } catch (error) {
    res.status(500).send('Error on the server');
  }
};

/**
 * @desc User login
 * @route POST /auth/login
 */
exports.auth_login = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }

      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);

          res.header('auth-token', token).send(token);
        } else {
          res.status(404).send({
            auth: false,
            message: 'Authentication failed',
          });
        }
      } else {
        res.status(404).json({
          auth: false,
          error: 'User does not exist',
        });
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.status(500).send('Error on the server');
  }
};
