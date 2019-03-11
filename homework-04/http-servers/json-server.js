const http = require('http')

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    { color: 'blue' },
    { size: 'XL' }
  ]
}

const app = http.createServer()
app.on('request', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(product))
})
app.listen(3000)
