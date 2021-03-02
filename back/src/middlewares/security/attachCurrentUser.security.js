const User = require('../../models/user.model')

module.exports = async (req, res, next) => {
  const currentUserId = req.user.id
  const userRecord = await User.findOne({ _id: currentUserId })

  req.currentUser = userRecord

  if (!userRecord) {
    return res.status(401).end('User not found')
  } else {
    return next()
  }
}
