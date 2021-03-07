const Topic = require('../models/topic.model')
const Category = require('../models/category.model')
const User = require('../models/user.model')
const Reply = require('../models/reply.model')

/**
 * @description Create a new reply to topic
 * @api /api/reply
 * @access PRIVATE
 * @type POST
 */
exports.reply_create = async (req, res) => {
  try {
    const { topicId, content } = req.body

    const topic = await Topic.findById(topicId)

    const newReply = new Reply({
      topic: topic,
      content: content,
      createdBy: req.currentUser,
      isActive: true
    })

    topic.replies.push(newReply)
    await topic.save()

    await newReply.save()

    res.status(200).json(newReply)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}
