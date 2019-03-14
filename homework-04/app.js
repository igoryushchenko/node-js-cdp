import express from 'express'
import users from './routes/users'
import products from './routes/products'
import authentication from './routes/authentication'
import cookieParser from './middlewares/cookieParser'
import queryParser from './middlewares/queryParser'
import verifyToken from './middlewares/verifyJWT'

import logger from 'morgan'

const app = express()
const apiRouter = express.Router()

apiRouter.use('/auth', authentication)
apiRouter.use('/users', users)
apiRouter.use('/products', products)

app.all('*', cookieParser, queryParser)
app.all(/^\/api\/(?!auth*).*$/, verifyToken)
app.use('/api', apiRouter)
app.use(logger('dev'))

export default app
