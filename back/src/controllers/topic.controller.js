const Topic = require('../models/topic.model')
const Category = require('../models/category.model')

/**
 * @description Create a new topic in category
 * @api POST /api/topic
 * @access PRIVATE
 */
exports.topic_create = async (req, res) => {
  try {
    const { categoryId, name, content } = req.body

    const category = await Category.findById(categoryId)
    if (!category) res.status(404).json({
      sucess: false,
      message: 'Category not found!'
    })

    const newTopic = new Topic({
      category: category,
      name: name,
      content: content,
      createdBy: req.currentUser,
      isActive: true
    })

    category.topics.push(newTopic)
    category.save()

    await newTopic.save()

    res.status(201).json({
      newTopic,
      sucess: true,
      message: 'Topic successfully created'
    })
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong.",
    });
  }
}
