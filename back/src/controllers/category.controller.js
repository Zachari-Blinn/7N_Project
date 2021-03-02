const Category = require('../models/category.model')
const Forum = require('../models/forum.model')
const User = require('../models/user.model')

exports.category_create = async (req, res) => {
  try {
    const { forumId, title, description } = req.body
    const currentUserId = req.user.id

    // get current user
    const currentUser = await User.findOne({_id: currentUserId})
    console.log(currentUserId)

    if (!currentUser) throw 'User not found!'

    // get forum provided
    const forum = await Forum.findOne({_id: forumId})
    if (!forum) throw 'Forum not found!'

    const newCategory = new Category({
      forum: forum,
      title: title,
      description: description,
      createdBy: currentUser,
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
