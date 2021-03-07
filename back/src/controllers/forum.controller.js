const Forum = require('../models/forum.model')
const Category = require('../models/category.model')

/**
 * @description Create a new Forum
 */
exports.forum_create = async (req, res) => {
  try {
    const newForum = new Forum({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.currentUser,
      isActive: true
    })

    await newForum.save()

    res.status(201).json(newForum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Find one forum by id
 */
exports.forum_findOne = async (req, res) => {
  try {
    const forum = await Forum.findOne({ _id: req.params.id })

    if (!forum) throw new Error('Forum not found!')

    res.status(200).json(forum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Find all forum
 */
exports.forum_find = async (req, res) => {
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

    console.log(forum)

    if (!forum) throw new Error('There are no forum!')

    res.status(200).json(forum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Update selected forum with id
 */
exports.forum_update = async (req, res) => {
  try {
    const forum = await Forum.findOneAndUpdate({ _id: req.params.id }, {
      $set: req.body
    })

    if (!forum) throw new Error('Forum not found!')

    res.status(200).json(forum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}

/**
 * @description Delete selected forum with id
 */
exports.forum_delete = async (req, res) => {
    Forum.findOneAndDelete({ _id: req.params.id }, (err, forum) => {
      res.status(200).json(forum)
    })
}

exports.forum_test = async (req, res) => {
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

    // todo count & select

    console.log(forum)

    res.status(200).json(forum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
}
