const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).send('Access Denied! No token provided!')

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      req.user = user
      next()
    })
  } catch (error) {
    res.status(401).json({
      message: 'Forbidden access'
    })
  }
}
