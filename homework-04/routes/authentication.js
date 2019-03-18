import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import FacebookStrategy from 'passport-facebook'
import TwitterStrategy from 'passport-twitter'
import authController from '../controllers/authController'

const router = express.Router()

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const secret = process.env.tokenSecret

router.post('/local', authController.localAuth)

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, authController.localPassportAuth
))

passport.use(new FacebookStrategy({
  clientID: process.env.facebookAppId,
  clientSecret: process.env.facebookAppSecret,
  callbackURL: process.env.facebookCallbackUrl,
  session: false
}, authController.socialAuth))

passport.use(new TwitterStrategy({
  consumerKey: process.env.twitterConsumerKey,
  consumerSecret: process.env.twitterConsumerSecret,
  callbackURL: process.env.twitterCallbackUrl,
  session: false
}, authController.socialAuth))

passport.use(new GoogleStrategy({
  clientID: process.env.googleConsumerKey,
  clientSecret: process.env.googleConsumerSecret,
  callbackURL: process.env.googleCallbackUrl,
  session: false
}, authController.socialAuth))

router.post('/passport-local', passport.authenticate('local', { session: false }), (req, res) => {
  let data = {
    user: req.user
  }
  let token = jwt.sign(data, secret, { expiresIn: process.env.tokenExpireTime })
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
    let token = jwt.sign(data, secret, { expiresIn: process.env.tokenExpireTime })
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
    let token = jwt.sign(data, secret, { expiresIn: process.env.tokenExpireTime })
    let payload = {
      code: 200,
      message: 'OK',
      data: data,
      token: token
    }
    res.status(200).json(payload)
  })

router.get('/google', passport.authenticate('google', { session: false, scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ] }))

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/google', session: false }), (req, res) => {
    let data = {
      user: req.user
    }
    let token = jwt.sign(data, secret, { expiresIn: process.env.tokenExpireTime })
    let payload = {
      code: 200,
      message: 'OK',
      data: data,
      token: token
    }
    res.status(200).json(payload)
  })

export default router
