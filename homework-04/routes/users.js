import express from 'express'
import userController from '../controllers/userController'
import { raiseAnErrorResponse } from './requestUtils'

const router = express.Router()

router.get('/', (req, res) => {
  userController.getUsers()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      raiseAnErrorResponse(res, err)
    })
})

router.delete('/:id', (req, res) => {
  userController.deleteUser(req.params['id'])
    .then(deletedUser => {
      res.json(deletedUser)
    })
    .catch(err => {
      raiseAnErrorResponse(res, err)
    })
})

export default router
