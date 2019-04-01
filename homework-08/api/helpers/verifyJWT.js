import jwt from 'jsonwebtoken'

module.exports.verifyJwt = function (req, callback) {
  let token = req.headers[process.env.tokenHeaderName]
  if (token) {
    jwt.verify(token, process.env.tokenSecret, (err, decoded) => {
      if (err) {
        console.log(err)
        return callback(new Error('Token Invalid'))
      } else {
        return callback(null)
      }
    })
  } else {
    return callback(new Error('Access Forbidden'))
  }
}
