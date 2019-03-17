import express from 'express'

const Product = require('../models').Product
const Review = require('../models').Review

const router = express.Router()

router.use(express.json())

router.param('id', (req, res, next, id) => {
  Product.findByPk(id, {include: [ { model: Review, as: 'reviews' } ]})
      .then(product => {
        req.product = product
        next()
      })
})

router.get('/', (req, res) => {
  Product.findAll({include: [ { model: Review, as: 'reviews' } ]})
      .then(products => {
        res.json(products)
      })
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
//   "name": "Gucci Glasses"
//  }

router.post('/', (req, res) => {
  if (req.body !== undefined) {
    Product.create({name: req.body.name})
        .then(newProduct => {
          res.status(201).json(newProduct)
        })
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
