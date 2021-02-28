const Forum = require('../models/forum.model')

/**
 * @description Create a new Forum
 * @param {*} req.body
 * @param {*} res
 */
exports.forum_create = async (req, res) => {
  try {
    const newForum = new Forum(req.body)

    await newForum.save()

    res.status(201).json(newForum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Find one forum by id
 * @param {*} req.params
 * @param {*} res
 */
exports.forum_findOne = async (req, res) => {
  try {
    const forum = await Forum.findOne({ _id: req.params.id })

    if (!forum) throw new Error('Forum not found!')

    res.status(200).json(forum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Find all forum
 * @param {*} res
 */
exports.forum_find = async (req, res) => {
  try {
    const forum = await Forum.find()

    if (!forum) throw new Error('There are no forum!')

    res.status(200).json(forum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Update selected forum with id
 * @param {*} req.params
 * @param {*} res
 */
exports.forum_update = async (req, res) => {
  try {
    const forum = await Forum.findOneAndUpdate({ _id: req.params.id }, {
      $set: req.body
    })

    if (!forum) throw new Error('Forum not found!')

    res.status(200).json(forum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Delete selected forum with id
 * @param {*} req.params
 * @param {*} res
 */
exports.forum_delete = async (req, res) => {
  try {
    // todo verification et suppression en cascase si enfant
    const forum = await Forum.findOneAndDelete({ _id: req.params.id })

    if (!forum) throw new Error('Forum not found!')

    res.status(200).json(forum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}
