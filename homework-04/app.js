import express from 'express'
import users from './routes/users'
import products from './routes/products'
import cities from './routes/cities'
import authentication from './routes/authentication'
import passport from 'passport'
import cookieParser from './middlewares/cookieParser'
import queryParser from './middlewares/queryParser'
import verifyToken from './middlewares/verifyJWT'
import db from './models/index'
import mongo from './models/mongo/mongoDB'

import logger from 'morgan'

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

mongo.once('open', function () {
  console.log('MongoDB connection succesful!')
})

const app = express()
const apiRouter = express.Router()

app.use(logger('tiny'))
app.use(passport.initialize())
app.use(express.urlencoded())
apiRouter.use('/auth', authentication)

apiRouter.use('/users', users)
apiRouter.use('/products', products)
apiRouter.use('/cities', cities)
app.all('*', cookieParser, queryParser)
app.all(/^\/api\/(?!auth*).*$/, verifyToken)
app.use('/api', apiRouter)

export default app
