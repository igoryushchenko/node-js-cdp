import mongoose from 'mongoose'

mongoose.connect(process.env.mongoDbConnectionString)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('MongoDB connection succesful!')
})

export default db
