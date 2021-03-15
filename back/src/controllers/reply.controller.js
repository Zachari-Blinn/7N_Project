const Topic = require('../models/topic.model')
const Category = require('../models/category.model')
const User = require('../models/user.model')
const Reply = require('../models/reply.model')

/**
 * @description Create a new reply to topic
 * @api POST /api/reply
 * @access PRIVATE
 */
exports.reply_create = async (req, res) => {
  try {
    const { topicId, content } = req.body

    const topic = await Topic.findById(topicId)
    if (!topic) res.status(404).json({
      sucess: false,
      message: 'Topic not found!'
    })

    const newReply = new Reply({
      topic: topic,
      content: content,
      createdBy: req.currentUser,
      isActive: true
    })

    topic.replies.push(newReply)

    topic.save()

    newReply.save()

    res.status(200).json({
      newReply,
      sucess: true,
      message: "Reply successfully created",
    })
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong.",
    });
  }
}
