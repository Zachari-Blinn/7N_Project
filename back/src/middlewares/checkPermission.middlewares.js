const Permission = require('../models/permission');

/**
 * @param {string} modelName 
 * @param {string} typePermission 
 * @returns 
 */
module.exports = (modelName, typePermission) => (req, res, next) => {
  const user = req.user;

  const permissions = Permission.find({ modelName: modelName }).populate({
    path: 'users',
    model: User,
    match: { _id: { $gte: user.id }},
  })

  switch (typePermission) {
    case 'read':
      if (permissions && permissions.read == false) return res.status(401).end('User not authorized')
      break;
    case 'update':
      if (permissions && permissions.update == false) return res.status(401).end('User not authorized')
      break;
    case 'delete':
      if (permissions && permissions.delete == false) return res.status(401).end('User not authorized')
      break;
    default:
      return next()
    }
}
