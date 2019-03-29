import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  reviews: {
    type: [String]
  }
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

export default mongoose.model('Product', ProductSchema)
