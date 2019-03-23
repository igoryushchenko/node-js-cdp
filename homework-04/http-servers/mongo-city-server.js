const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'

require('http')
  .createServer()
  .on('request', (req, res) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        console.log(err)
        res.end('Something went wrong')
      } else {
        const cityCollection = client.db('node-cdp').collection('cities')
        console.log('Client ready')
        cityCollection.aggregate([{ $sample: { size: 1 } }]).toArray()
          .then(result => {
            console.log(result)
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(result))
          })
          .catch(err => {
            console.log(err)
            res.statusCode = 500
            res.end('Server error')
          })
      }
      client.close()
    })
  })
  .listen(3000)
