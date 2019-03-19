import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  lat: Number,
  long: Number
})

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: String,
  capital: {
    Boolean,
    required: true
  },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }
})

const Location = mongoose.model('Location', locationSchema)
const City = mongoose.model('City', citySchema)

export default { City, Location }
