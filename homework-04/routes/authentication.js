import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import FacebookStrategy from 'passport-facebook'
import TwitterStrategy from 'passport-twitter'
import config from '../config/config.json'
import User from '../models/User'

const router = express.Router()

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

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

passport.use(new FacebookStrategy({
  clientID: config.facebookAppId,
  clientSecret: config.facebookAppSecret,
  callbackURL: 'http://localhost:9000/api/auth/facebook/callback',
  session: false
}, (accessToken, refreshToken, profile, done) => {
  if (profile) {
    const user = usersDb.find(user => user.id === profile.id)
    if (user) {
      done(null, user)
    } else {
      console.log('User not found in DB')
    }
  }
}))

passport.use(new TwitterStrategy({
  consumerKey: config.twitterConsumerKey,
  consumerSecret: config.twitterConsumerSecret,
  callbackURL: 'http://localhost:9000/api/auth/twitter/callback',
  session: false
}, (accessToken, refreshToken, profile, done) => {
  if (profile) {
    const user = usersDb.find(user => user.id === profile.id)
    if (user) {
      done(null, user)
    } else {
      console.log('User not found in DB')
    }
  }
}))

passport.use(new GoogleStrategy({
  clientID: config.googleConsumerKey,
  clientSecret: config.googleConsumerSecret,
  callbackURL: 'http://localhost:9000/api/auth/google/callback',
  session: false
}, (accessToken, refreshToken, profile, done) => {
  if (profile) {
    const user = usersDb.find(user => user.id === profile.id)
    if (user) {
      done(null, user)
    } else {
      console.log('User not found in DB')
    }
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

router.get('/facebook', passport.authenticate('facebook', { session: false }))

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/facebook', session: false }), (req, res) => {
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


router.get('/twitter', passport.authenticate('twitter', { session: false }))

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/twitter', session: false }), (req, res) => {
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

router.get('/google', passport.authenticate('google', { session: false, scope: 'https://www.googleapis.com/auth/plus.login' }))

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/google', session: false }), (req, res) => {
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

export default router
