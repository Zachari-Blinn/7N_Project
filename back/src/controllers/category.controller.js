const Category = require('../models/category.model')
const Forum = require('../models/forum.model')

/**
 * @description Create category
 * @api POST /api/category/
 * @access PRIVATE
 */
exports.category_create = async (req, res) => {
  const { forumId, title, description } = req.body

  const forum = await Forum.findOne({ _id: forumId })
  if (!forum) res.status(404).json({
    sucess: false,
    message: 'Forum not found!'
  })

  const newCategory = new Category({
    forum: forum,
    title: title,
    description: description,
    createdBy: req.currentUser,
  })

  forum.categories.push(newCategory)

  forum.save()

  newCategory.save((err, category) => {
    res.status(201).json({
      category,
      sucess: true,
      message: 'Category successfully created'
    })
  })
}
