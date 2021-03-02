const Forum = require('../models/forum.model')
const User = require('../models/user.model')

/**
 * @description Create a new Forum
 * @param {*} req.body
 * @param {*} res
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
 * @param {*} req.params
 * @param {*} res
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
 * @param {*} res
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
 * @param {*} req.params
 * @param {*} res
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
 * @param {*} req.params
 * @param {*} res
 */
exports.forum_delete = async (req, res) => {
  try {
    // todo verification et suppression en cascase si enfant
    const forum = await Forum.findOneAndDelete({ _id: req.params.id })

    if (!forum) throw new Error('Forum not found!')

    res.status(200).json(forum)
  } catch (error) {
    res.status(500).json(`Error: ${error}`)
  }
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
