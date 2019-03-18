import express from 'express'

const User = require('../models').User
const router = express.Router()

router.get('/', (req, res) => {
    User.findAll().then(users => {
        res.json(users)
    })
})

export default router
