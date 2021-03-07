const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      res.status(401).json({
        message: 'Forbidden access: ' + error
      })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) return res.status(403).json({
        message: 'Forbidden access: ' + error
      })

      req.user = decodedToken
      next()
    })

  } catch (error) {
    res.status(401).json({
      message: 'Forbidden access: ' + error
    })
  }
}
