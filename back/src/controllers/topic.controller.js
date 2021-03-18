const Topic = require('../models/topic')
const Category = require('../models/category')

/**
 * @description Create a new topic in category
 * @api POST /api/topic
 * @access PRIVATE
 */
exports.topic_create = async (req, res) => {
  try {
    const { categoryId, title, content } = req.body

    const category = await Category.findById(categoryId)

    if (!category) {
      res.status(404).json({
        sucess: false,
        message: 'Category not found!'
      })
    }

    Topic.create({
      category: category,
      title: title,
      content: content,
      createdBy: req.currentUser,
    }, (err, newTopic) => {
      if (err) throw new Error(err)

      category.topics.push(newTopic._id)
      category.save()

      newTopic.save()

      res.status(201).json({
        newTopic,
        sucess: true,
        message: 'Topic successfully created'
      })
    })
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: 'Something went wrong.'
    })
  }
}
