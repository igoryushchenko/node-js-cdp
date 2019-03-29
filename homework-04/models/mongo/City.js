import mongoose from 'mongoose'
import lastModifiedPlugin from './lastModifiedPlugin'

const LocationSchema = new mongoose.Schema({
  lat: Number,
  long: Number
})

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: String,
  capital: {
    type: Boolean,
    required: true
  },
  location: LocationSchema
},
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    }
  })

CitySchema.plugin(lastModifiedPlugin.lastModifiedPlugin)

export const Location = mongoose.model('Location', LocationSchema)
export const City = mongoose.model('City', CitySchema)
