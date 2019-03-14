import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import config from '../config/config.json'
import User from '../models/User'

const router = express.Router()
const usersDb = User.getUsersDB()
const secret = config.tokenSecret

router.post('/local', (req, res) => {
  if (req.parsedQuery && req.parsedQuery.email) {
    const user = usersDb.find(user => user.email === req.parsedQuery.email)
    if (user && user.password === req.parsedQuery.password) {
      let data = {
          user: user
      }
      let token = jwt.sign(data, secret, { expiresIn: 20 })
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
  } else {
    res.status(404).json({
      code: 404,
      message: 'Missing body'
    })
  }
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (username, password, done) => {
  const user = usersDb.find(user => user.email === username)
  if (user && user.password === password) {
    done(null, user)
  } else {
    done(null, false, 'Invalid email or password')
  }
}))

router.post('/passport-local', passport.authenticate('local', { session: false }), (req, res) => {
  let data = {
    user: req.user
  }
  let token = jwt.sign(data, secret, { expiresIn: 20 })
  let payload = {
    code: 200,
    message: 'OK',
    data: data,
    token: token
  }
  res.status(200).json(payload)
})

router.post('/facebook', (req, res) => {
  console.log('auth')
})

router.post('/twitter', (req, res) => {
  console.log('auth')
})

router.post('/google', (req, res) => {
  console.log('auth')
})

export default router
