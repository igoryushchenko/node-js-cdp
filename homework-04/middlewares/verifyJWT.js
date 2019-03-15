import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default (req, res, next) => {
  let token = req.headers[process.env.tokenHeaderName]
  if (token) {
    jwt.verify(token, process.env.tokenSecret, (err, decoded) => {
      if (err) {
        console.log(err)
        res.status(403).json({
          code: 403,
          message: 'Token Invalid'
        })
      } else {
        next()
      }
    })
  } else {
    res.status(403).json({
      code: 403,
      message: 'Access Forbidden'
    })
  }
}
