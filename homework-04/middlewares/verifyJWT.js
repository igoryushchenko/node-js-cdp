import jwt from 'jsonwebtoken'
import config from '../config/config.json'

const secret = config.tokenSecret
const tokenHeaderName = config.tokenHeaderName

export default (req, res, next) => {
  let token = req.headers[tokenHeaderName]
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
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
