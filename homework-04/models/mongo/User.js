import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  },
  password: {
    type: String,
    required: true
  }
},
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id
        delete ret.password
      }
    }
  })

export default mongoose.model('User', userSchema)
