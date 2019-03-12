import express from 'express'
import users from './routes/users'
import products from './routes/products'
import cookieParser from './middlewares/cookieParser'
import queryParser from './middlewares/queryParser'

const app = express()
const apiRouter = express.Router()

apiRouter.use('/users', users)
apiRouter.use('/products', products)

app.all('*', cookieParser, queryParser)
app.use('/api', apiRouter)

export default app
