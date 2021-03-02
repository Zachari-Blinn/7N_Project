const Topic = require('../models/topic.model')
const Category = require('../models/category.model')
const User = require('../models/user.model')

exports.topic_create = async (req, res) => {
  try {
    const { categoryId, name, content } = req.body
    const currentUserId = req.user.id

    console.log('test 1')

    // get current user
    const currentUser = await User.findById(currentUserId)

    console.log('test 2')

    // get category provided
    const category = await Category.findById(categoryId)
    if (!category) throw 'Category not found!'

    console.log('test 3')

    const newTopic = new Topic({
      category: category,
      name: name,
      content: content,
      createdBy: currentUser,
      isActive: true
    })

    console.log('test 4')

    category.topics.push(newTopic)
    await category.save()

    console.log('test 5')

    await newTopic.save()

    console.log('test 6')

    res.status(201).json(newTopic)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}
