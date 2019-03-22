const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'

require('http')
  .createServer()
  .on('request', (req, res) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        console.log(err)
        res.code(500).json({
          code: 500,
          message: 'Something went wrong'
        })
      } else {
        const cityCollection = client.db('node-cdp').collection('cities')
        console.log('Client ready')
        cityCollection.aggregate([{ $sample: { size: 1 } }], (err, data) => {
          if (err) {
            console.log(err)
            res.status(500).json({
              code: 500,
              message: 'Something went wrong'
            })
          } else {
            console.log(data)
            res.json(data)
          }
        })
      }
      client.close()
    })
  })
  .listen(3000)
