import express from 'express'
import users from './routes/users'
import products from './routes/products'
import cookieParser from './middlewares/cookieParser'


const app = express()
const apiRouter = express.Router()

apiRouter.use('/users', users)
apiRouter.use('/products', products)

app.use('/api', apiRouter)
app.all('*', cookieParser)

export default app
