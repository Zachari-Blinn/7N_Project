const Forum = require('../models/forum.model')
const { ErrorHandler } = require('../helpers/error.helper')

/**
 * @description Create a new Forum
 * @api POST /api/forum
 * @access PRIVATE
 */
exports.forum_create = (req, res) => {
  try {
    const { title, description } = req.body

    const newForum = new Forum({
      title: title,
      description: description,
      createdBy: req.currentUser,
      isActive: true
    })

    newForum.save((err, forum) => {
      res.status(201).json({
        forum,
        sucess: true,
        message: "Forum successfully created",
      })
    })
    
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong.",
    });
  }
}

/**
 * @description Find one forum by id
 * @api GET /api/forum/:id
 * @access PUBLIC
 */
exports.forum_findOne = (req, res) => {
  try {
    Forum.findOne({ _id: req.params.id }, (err, forum) => {
      res.status(200).json({
        forum,
        sucess: true,
        message: "Forum successfully funded",
      })
    })
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong.",
    });
  }
}

/**
 * @description Find all forum
 * @api /api/forum
 * @access PUBLIC
 * @type GET
 */
exports.forum_find = async (req, res, next) => {
  try {
    const forum = await Forum.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'categories',
          let: { categories: '$categories' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$categories'] } } },
            { $match: { isActive: true } },
            {
              $addFields: {
                total_topics: { $size: '$topics' }
              }
            },
            {
              $lookup: {
                from: 'topics',
                let: { topics: '$topics' },
                pipeline: [
                  { $match: { $expr: { $in: ['$_id', '$$topics'] } } },
                  { $match: { isActive: true } },
                  { $sort: { createdAt: -1 } },
                  { $limit: 1 },
                  {
                    $lookup: {
                      from: 'replies',
                      let: { replies: '$replies' },
                      pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$replies'] } } },
                        { $match: { isActive: true } },
                        { $sort: { createdAt: -1 } },
                        { $limit: 1 }
                      ],
                      as: 'replies'
                    }
                  }
                ],
                as: 'topics'
              }
            }
          ],
          as: 'categories'
        }
      }
    ])
    // todo count all topics, comments and get last comments

    if (!forum) throw new ErrorHandler(404, 'There are no forum!')

    res.status(200).json(forum)
  } catch (error) {
    next(error)
  }
}

/**
 * @description Update selected forum with id
 * @api PUT /api/forum/:id
 * @access PRIVATE
 */
exports.forum_update = async (req, res, next) => {
  try {
    const forum = await Forum.findOneAndUpdate({ _id: req.params.id }, {
      $set: req.body
    })

    if (!forum) throw new ErrorHandler(404, 'Forum not found!')

    res.status(200).json(forum)
  } catch (error) {
    next(error)
  }
}

/**
 * @description Delete selected forum with id
 * @api DELETE /api/forum/:id
 * @access PRIVATE
 */
exports.forum_delete = async (req, res, next) => {
  try {
    Forum.findOneAndDelete({ _id: req.params.id }, (err, forum) => {
      res.status(200).json(forum)
    })
  } catch (error) {
    next(error)
  }
}
