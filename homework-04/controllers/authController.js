import jwt from 'jsonwebtoken'

const User = require('../models').User

function localAuth (req, res) {
    if (req.body && req.body.email) {
        User.findOne({ where: { email: req.body.email, password: req.body.password } })
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

function localPassportAuth (username, password, done) {
    User.findOne({ where: { email: username, password } })
        .then(user => {
            if (user) {
                done(null, user)
            } else {
                console.log('User not found in DB')
            }
        })
}

function socialAuth (accessToken, refreshToken, profile, done) {
    if (profile) {
        User.findOrCreate({ where: { email: profile.emails[0].value } })
            .then(([user, created]) => {
                if (user) {
                    done(null, user)
                } else {
                    console.log('User not found in DB')
                }
            })
    }
}

export default { localAuth, localPassportAuth, socialAuth }
