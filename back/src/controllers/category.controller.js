const Category = require('../models/category.model')
const Forum = require('../models/forum.model')
const User = require('../models/user.model')

/**
 * @route POST /category/
 * @description Create category
 * @access Authenticated
 */
exports.category_create = async (req, res) => {
  try {
    const { forumId, title, description } = req.body

    // get forum provided
    const forum = await Forum.findOne({ _id: forumId })
    if (!forum) throw 'Forum not found!'

    const newCategory = new Category({
      forum: forum,
      title: title,
      description: description,
      createdBy: req.currentUser,
      isActive: true
    })

    // provide category at forum
    forum.categories.push(newCategory)
    await forum.save()

    await newCategory.save()

    res.status(201).json(newCategory)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}
