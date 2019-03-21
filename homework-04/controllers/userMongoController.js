import User from '../models/mongo/User'

function deleteUser (req, res) {
  User.findOneAndRemove(req.params['id'], err => {
    if (err) {
      res.status(500).json({
        code: 500,
        message: 'Something went wrong'
      })
    } else {
      res.json({
        code: 200,
        message: 'Successfully deleted'
      })
    }
  })
}

function getUsers (req, res) {
  User.find((err, users) => {
    if (err) {
      res.status(500).json({
        code: 500,
        message: 'Something went wrong'
      })
    } else {
      res.json(users)
    }
  })
}

export default { getUsers, deleteUser }
