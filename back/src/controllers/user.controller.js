const User = require('../models/user.model')

/**
 * @description Create a new user
 * @param {Email, password} req.body
 * @param {User} res
 */
exports.user_create = async (req, res) => {
  try {
    const newUser = new User(req.body)

    // todo encrypt password

    await newUser.save()

    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Find one user with id
 * @param {id} req.params
 * @param {User} res
 */
exports.user_findOne = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })

    if (!user) throw new Error('User not found!')

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Find all user
 * @param {User} res
 */
exports.user_find = async (req, res) => {
  try {
    const user = await User.find()

    if (!user) throw new Error('There are no users!')

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Update selected user with id
 * @param {id} req.params
 * @param {User} res
 */
exports.user_update = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, {
      $set: req.body
    })

    if (!user) throw new Error('User not found!')

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Delete selected user with id
 * @param {id} req.params
 * @param {User} res
 */
exports.user_delete = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id })

    if (!user) throw new Error('User not found!')

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

exports.user_me = async (req, res) => {
  try {
    res.json(req.currentUser)
  } catch (error) {
    res.send({ message: 'Error in Fetching user' })
  }
}
