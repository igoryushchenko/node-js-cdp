import UserMongo from '../models/mongo/User'
import UserSql from '../models/User'

const useMongo = process.env.useMongoAsDb

function getUserByCredentials (email, password) {
  if (useMongo) {
    return new Promise((resolve, reject) => {
      UserMongo.find({ email, password }, (err, user) => {
        if (err) {
          reject(err)
        } else {
          resolve(user)
        }
      })
    })
  } else {
    return UserSql.findOne({ where: { email, password } })
  }
}

function getUserByEmailOrCreate (profile) {
  if (useMongo) {
    return new Promise((resolve, reject) => {
      UserMongo.find({ email: profile.emails[0].value }, (err, user) => {
        if (err) {
          reject(err)
        }
        if (user) {
          resolve(user)
        } else {
          const firstName = profile.name.givenName ? profile.name.givenName : profile.displayName
          const lastName = profile.name.familyName ? profile.name.familyName : ''
          this.create({
            firstName,
            lastName,
            email: profile.emails[0].value
          }, (err, user) => {
            if (err) {
              reject(err)
            } else {
              resolve(user)
            }
          })
        }
      })
    })
  } else {
    return UserSql.findOrCreate({ where: { email: profile.emails[0].value } })
  }
}

export default { getUserByCredentials, getUserByEmailOrCreate }
