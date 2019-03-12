import express from 'express'
import url from 'url'

const router = express.Router()

router.use((req, res, next) => {
  req.parsedQuery = url.parse(req.url, true).query
  next()
})

export default router
