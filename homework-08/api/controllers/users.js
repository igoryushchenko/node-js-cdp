import userService from '../services/userService'
import { raiseAnErrorResponse } from './requestUtils'

module.exports.findAllUsers = function findAllUsers (req, res) {
    userService.getUsers()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            raiseAnErrorResponse(res, err)
        })
}

module.exports.deleteUser = function deleteUser (req, res) {
    userService.deleteUser(req.params['id'])
        .then(deletedUser => {
            res.json(deletedUser)
        })
        .catch(err => {
            raiseAnErrorResponse(res, err)
        })
}
