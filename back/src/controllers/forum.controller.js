const Forum = require('../models/forum.model');

/**
 * @description Create a new Forum
 * @param {title, description} req
 * @param {*} res
 */
exports.forum_create = async (req, res) => {
  try {
    const newForum = new Forum(req.body);

    await newForum.save();

    res.status(201).json(newForum);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};
