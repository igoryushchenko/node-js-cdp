const User = require('../models').User

function getUsers (req, res) {
  User.findAll().then(users => {
    res.json(users)
  })
}

function deleteUser (req, res) {
  User.destroy({ where: { id: req.params['id'] } })
    .then(deletedUser => {
      res.code(200).json({
        code: 200,
        message: 'Successfully deleted'
      })
  })
}

export default { getUsers, deleteUser }
