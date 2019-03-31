import jwt from 'jsonwebtoken'
import authService from '../services/authService'

module.exports.localAuth = function localAuth (req, res)  {
  if (req.body && req.body.email) {
    authService.getUserByCredentials(req.body.email, req.body.password)
      .then(user => {
        if (user) {
          let data = {
            user: user
          }
          let token = jwt.sign(data, process.env.tokenSecret, { expiresIn: process.env.tokenExpireTime })
          let payload = {
            code: 200,
            message: 'OK',
            data: data,
            token: token
          }
          res.status(200).json(payload)
        } else {
          res.status(404).json({
            code: 404,
            message: 'Not Found'
          })
        }
      })
  } else {
    res.status(404).json({
      code: 404,
      message: 'Missing body'
    })
  }
}
