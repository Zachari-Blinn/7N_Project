const Category = require('../models/category.model')
const Forum = require('../models/forum.model')

/**
 * @route POST /category/
 * @description Create category
 * @access Authenticated
 */
exports.category_create = async (req, res) => {
  const { forumId, title, description } = req.body

  const forum = await Forum.findOne({ _id: forumId })
  if (!forum) throw new Error('Forum not found!')

  const newCategory = new Category({
    forum: forum,
    title: title,
    description: description,
    createdBy: req.currentUser,
    isActive: true
  })

  forum.categories.push(newCategory)

  forum.save()

  newCategory.save(function (err, category){
    if (err) return console.error(err);

    res.status(201).json(category)
  })
}
