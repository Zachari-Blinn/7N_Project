const User = require('../models/user.model');

/**
 * @description Create a new user
 * @param {*} req
 * @param {*} res
 */
exports.user_create = async (req, res) => {
  try {
    const newUser = new User(req.body);

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};

/**
 * @description Find one user by id
 * @param {*} req
 * @param {*} res
 */
exports.user_findOne = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) throw new Error('User not found!');

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};

/**
 * @description Find all user
 * @param {*} req
 * @param {*} res
 */
exports.user_find = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) throw new Error('There are no users!');

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};

exports.user_update = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, {
      $set: req.body,
    });

    if (!user) throw new Error('User not found!');

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};

exports.user_delete = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) throw new Error('User not found!');

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};
