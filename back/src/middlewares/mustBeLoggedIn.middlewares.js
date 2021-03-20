const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let token = req.headers.authorization || req.body.token || req.headers["x-access-token"]

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    next()
  } catch (error) {
    res.status(401).json({
      status: false,
      message: 'Forbidden access: you must provide a valid token.'
    })
  }
}
