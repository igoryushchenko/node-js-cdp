import express from 'express'
import cookieParser from 'cookie-parser'

const router = express.Router()
router.use(cookieParser())

router.use((req, res, next) => {
    req.parsedCookies = req.cookies
    next()
})

export default router
