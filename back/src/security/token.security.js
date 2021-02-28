const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).send('Access Denied! No token provided!')

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = verified

    next()
  } catch (error) {
    res.status(401).json({
      message: 'Forbidden'
    })
  }
}
