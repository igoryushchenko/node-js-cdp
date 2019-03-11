import express from 'express'
import cookieParser from 'cookieParser'

const router = express.Router()
router.use(cookieParser())

router.use((req, res, next) => {
    req.locals.​parsedCookies = req.cookies
    next()
})

export default router