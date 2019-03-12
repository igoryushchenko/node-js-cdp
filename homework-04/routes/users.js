import express from 'express'
import User from '../models/User'

const router = express.Router()

const usersDb = []
usersDb.push(new User('Bob', 'bob@mail.com'))
usersDb.push(new User('Jay', 'jay@mail.com'))

router.get('/', (req, res) => {
    res.json(usersDb)
})

export default router
