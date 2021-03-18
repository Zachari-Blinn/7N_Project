module.exports = (...permittedRoles) => (req, res, next) => {
  if (req.currentUser && permittedRoles.includes(req.currentUser.role)) {
    next()
  } else {
    res.status(401).json({ message: 'Action not allowed' })
  }
}
