const Forum = require('../models/forum.model');

/**
 * @description Create a new Forum
 * @param {title, description} req
 * @param {Forum} res
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

/**
 * @description Find one forum by id
 * @param {id} req
 * @param {Forum} res
 */
exports.forum_findOne = async (req, res) => {
  try {
    const forum = await Forum.findOne({ _id: req.params.id });

    if (!forum) throw new Error('Forum not found!');

    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};
