import express from 'express'
import User from '../models/User'

const router = express.Router()

const usersDb = User.getUsersDB()

router.get('/', (req, res) => {
    res.json(usersDb)
})

export default router
