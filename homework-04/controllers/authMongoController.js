import jwt from 'jsonwebtoken'
import User from '../models/mongo/User'

function localAuth (req, res) {
  if (req.body && req.body.email) {
    User.find({ email: req.body.email, password: req.body.password }, (err, user) => {
      if (err) {
        res.status(500).json({
          code: 500,
          message: 'Something went wrong'
        })
      }
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

function localPassportAuth (username, password, done) {
  User.find({ email: username, password }, (err, user) => {
    if (err) {
      done(err, null)
    }
    if (user) {
      done(null, user)
    } else {
      console.log('User not found in DB')
    }
  })
}

function socialAuth (accessToken, refreshToken, profile, done) {
  if (profile) {
    User.find({ email: profile.emails[0].value }, (err, user) => {
      if (err) {
        done(err, null)
      }
      if (user) {
        done(null, user)
      } else {
        const firstName = profile.name.givenName ? profile.name.givenName : profile.displayName
        const lastName = profile.name.familyName ? profile.name.familyName : ''
        this.create({
          firstName,
          lastName,
          email: profile.emails[0].value
        }, (err, user) => {
          if (err) {
            done(err, null)
          } else {
            done(null, user)
          }
        })
      }
    })
  }
}

export default { localAuth, localPassportAuth, socialAuth }
