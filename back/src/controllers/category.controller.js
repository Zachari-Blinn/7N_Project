const Category = require('../models/category.model')
const Forum = require('../models/forum.model')

/**
 * @description Create category
 * @api POST /api/category/
 * @access PRIVATE
 */
exports.category_create = async (req, res) => {
  try {
    const { forumId, title, description } = req.body

    const forum = await Forum.findOne({ _id: forumId })
    if (!forum) res.status(404).json({
      sucess: false,
      message: 'Forum not found!'
    })

    Category.create({
      forum: forum,
      title: title,
      description: description,
      createdBy: req.currentUser,
    }, (err, newCategory) => {
      forum.categories.push(newCategory._id)
      forum.save()

      newCategory.save()

      res.status(201).json({
        newCategory,
        sucess: true,
        message: 'Category successfully created'
      })
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong.",
    });
  }
}

/**
 * @description Find one category by id
 * @api GET /api/category/:id
 * @access PUBLIC
 */
 exports.category_findOne = async (req, res) => {
  try {
    const populate = req.query.populate;

    const category = await Category.findOne({ slug: req.params.slug }).populate(populate)

    res.status(200).json({
      category,
      sucess: true,
      message: "Category successfully funded",
    })
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: err,
    });
  }
}

/**
 * @description Find all category
 * @api GET /api/category/
 * @access PUBLIC
 */
exports.category_find = async (req, res) => {
  try {

    const category = await Category.find()

    res.status(200).json({
      category,
      sucess: true,
      message: "Category successfully funded",
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong.",
    });
  }
}
