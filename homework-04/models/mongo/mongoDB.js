import mongoose from 'mongoose'

mongoose.connect(process.env.mongoDbConnectionString)
const db = mongoose.connection

db.once('open', function () {
  console.log('MongoDB connection succesful!')
})
db.on('error', console.error.bind(console, 'connection error:'))

export default db
