import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  reviews: {
    type: [String]
  }
})

export default mongoose.model('Product', ProductSchema)
