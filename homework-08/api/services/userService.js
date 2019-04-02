import UserMongo from '../models/mongo/User'
import UserSql from '../models/User'

const useMongo = process.env.useMongoAsDb

function getUsers () {
  if (useMongo) {
    return new Promise((resolve, reject) => {
      UserMongo.find((err, users) => {
        if (err) {
          reject(err)
        }
        resolve(users)
      })
    })
  } else {
    return UserSql.findAll()
  }
}

function deleteUser (userId) {
  if (useMongo) {
    return new Promise((resolve, reject) => {
      UserMongo.findOneAndRemove(userId, (err, deletedUser) => {
        if (err) {
          reject(err)
        }
        resolve(deletedUser)
      })
    })
  } else {
    return UserSql.destroy({ where: { id: userId } })
  }
}

export default { getUsers, deleteUser }
