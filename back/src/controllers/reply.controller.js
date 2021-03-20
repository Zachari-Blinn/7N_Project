const Topic = require('../models/topic')
const Category = require('../models/category')
const User = require('../models/user')
const Reply = require('../models/reply')

/**
 * @description Create a new reply to topic
 * @api POST /api/reply
 * @access PRIVATE
 */
exports.reply_create = async (req, res) => {
  try {
    const { topicSlug, content } = req.body

    const topic = await Topic.findOne({slug: topicSlug})
    if (!topic) {
      res.status(404).json({
        sucess: false,
        message: 'Topic not found!'
      })
    }

    Reply.create({
      topic: topic,
      content: content,
      createdBy: req.currentUser,
      isActive: true
    }, (err, newReply) => {
      topic.replies.push(newReply._id)

      topic.save()

      newReply.save()

      res.status(200).json({
        newReply,
        sucess: true,
        message: 'Reply successfully created'
      })
    })
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: 'Something went wrong.'
    })
  }
}
