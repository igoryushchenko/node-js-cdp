import express from 'express'
import dotenv from 'dotenv'
import users from './routes/users'
import products from './routes/products'
import authentication from './routes/authentication'
import passport from 'passport'
import cookieParser from './middlewares/cookieParser'
import queryParser from './middlewares/queryParser'
import verifyToken from './middlewares/verifyJWT'
import db from './models/index'

import logger from 'morgan'

dotenv.config()

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const app = express()
const apiRouter = express.Router()

app.use(passport.initialize())
app.use(express.urlencoded())
apiRouter.use('/auth', authentication)
apiRouter.use('/users', users)

apiRouter.use('/products', products)
app.all('*', cookieParser, queryParser)
app.all(/^\/api\/(?!auth*).*$/, verifyToken)
app.use('/api', apiRouter)
app.use(logger('dev'))

export default app
