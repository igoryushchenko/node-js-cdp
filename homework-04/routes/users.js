import express from 'express'
import userController from '../controllers/userController'
import userMongoController from '../controllers/userMongoController'

const useMongo = process.env.useMongoAsDb
const router = express.Router()

router.get('/', useMongo ? userMongoController.getUsers : userController.getUsers)
router.delete('/:id', useMongo ? userMongoController.deleteUser : userController.deleteUser)

export default router
