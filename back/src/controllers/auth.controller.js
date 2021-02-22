const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * @description Register new user
 * @param {email, password} req.body
 * @param {User} res
 */
exports.auth_register = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) throw new Error(err);

      if (!user) {
        await bcrypt.hash(req.body.password, 10, (_err, cryptedPassword) => {
          req.body.password = cryptedPassword;
          req.body.role = 'user';
          req.body.isActive = true;

          User.create(req.body).then(
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
 * @description User login with credential
 * @param {email, password} req.body
 * @param {token} res
 */
exports.auth_login = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, async (err, user) => {
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);

          res.header('auth-token', token).send(token);
        } else {
          res.status(403).send({
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
    console.log(error);
    res.status(500).send('Error on the server');
  }
};
