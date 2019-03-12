const fs = require('fs')

require('http')
.createServer()
.on('request', (req, res) => {
  let body = ''
  const fileReadStream = fs.createReadStream('index.html')
  fileReadStream.on('data', chunk => {
    body += chunk
  }).on('close', () => {
    body = body.replace('{message}', 'Welcome to the http!')
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end(body)
  })
})
.listen(3000)
