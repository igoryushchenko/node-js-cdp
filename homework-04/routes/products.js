import express from 'express'
import Product from '../models/Product'

const productDb = []
const product1 = new Product('1111', 'Nice Book')
product1.addReview('Cool!')
product1.addReview('Awesome!')

const product2 = new Product('2222', 'T-Shirt')
product2.addReview('Cool!')
product2.addReview('Nice')

const product3 = new Product('3333', 'Black Boots')
product3.addReview('rubbish')
product3.addReview('so ugly')

productDb.push(product1)
productDb.push(product2)
productDb.push(product3)

const router = express.Router()

router.use(express.json())

router.param('id', (req, res, next, id) => {
  req.product = productDb.find(product => product.id === id)
  next()
})

router.get('/', (req, res) => {
  res.json(productDb)
})

router.get('/:id', (req, res) => {
  if (req.product === undefined) {
    res.status(404).json({
      success: false,
      reason: `Product with id=${req.params.id} not found`
    })
  } else {
    res.json(req.product)
  }
})

// body request example:
//  {
//   "id": "4444",
//   "name": "Gucci Glasses"
//  }

router.post('/', (req, res) => {
  if (req.body !== undefined) {
    const newProduct = new Product(req.body.id, req.body.name)
    productDb.push(newProduct)
    res.status(202).json(newProduct)
  } else {
    res.status(404).json({
      success: false,
      reason: 'Missing body'
    })
  }
})

router.get('/:id/reviews', (req, res) => {
  if (req.product === undefined) {
    res.status(404).json({
      success: false,
      reason: `Product with id=${req.params.id} not found`
    })
  } else {
    res.json(req.product.reviews)
  }
})

export default router
