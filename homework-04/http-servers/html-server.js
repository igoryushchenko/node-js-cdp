const fs = require('fs')
const trough = require('through2')
const split = require('split')

function write (buffer, encoding, next) {
  this.push(buffer.toString().replace('{message}', 'Welcome to the http!'))
  next()
}

function end (done) {
  done()
}

require('http')
.createServer()
.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  const transformStream = trough(write, end)
  fs.createReadStream('index.html').pipe(split()).pipe(transformStream).pipe(res)
})
.listen(3000)