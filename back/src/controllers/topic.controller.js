const Topic = require('../models/topic.model')
const Category = require('../models/category.model')

/**
 * @description Create a new topic in category
 * @api /api/topic
 * @access PRIVATE
 * @type POST
 */
exports.topic_create = async (req, res) => {
  try {
    const { categoryId, name, content } = req.body

    const category = await Category.findById(categoryId)
    if (!category) throw 'Category not found!'

    const newTopic = new Topic({
      category: category,
      name: name,
      content: content,
      createdBy: req.currentUser,
      isActive: true
    })

    category.topics.push(newTopic)
    await category.save()

    await newTopic.save()

    res.status(201).json(newTopic)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}
