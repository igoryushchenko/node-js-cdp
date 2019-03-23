import express from 'express'
import productController from '../controllers/productController'
import { raiseAnErrorResponse, raiseBadRequestResponse, raiseEntityNotFoundResponse } from './requestUtils'

const router = express.Router()

router.param('id', (req, res, next, id) => {
  productController.findProductById(id)
    .then(product => {
      req.product = product
      next()
  })
})

router.get('/', (req, res) => {
  productController.findAllProducts()
    .then(products => {
      res.json(products)
    })
    .catch(err => {
      raiseAnErrorResponse(res, err)
    })
})

router.get('/:id', (req, res) => {
  if (req.product) {
    res.json(req.product)
  } else {
    raiseEntityNotFoundResponse(res, req.params.id)
  }
})

router.post('/', (req, res) => {
  if (req.body) {
    productController.addNewProduct(req.body.name)
      .then(newProduct => {
        res.status(201).json(newProduct)
      })
      .catch(err => {
        raiseAnErrorResponse(res, err)
      })
  } else {
    raiseBadRequestResponse(res)
  }
})

router.delete('/:id', (req, res) => {
  if (req.product) {
    productController.deleteProduct(req.product)
      .then(deletedProduct => {
        res.status(200).json(deletedProduct)
      })
      .catch(err => {
        raiseAnErrorResponse(res, err)
      })
  } else {
    raiseEntityNotFoundResponse(res, req.params.id)
  }
})

router.get('/:id/reviews', (req, res) => {
  if (req.product) {
    res.json(req.product.reviews)
  } else {
    raiseEntityNotFoundResponse(res, req.params.id)
  }
})

router.post('/:id/reviews', (req, res) => {
  if (req.product) {
    productController.addProductReview(req.product, req.body.review)
      .then(newReview => {
        res.json(newReview)
      })
      .catch(err => {
        raiseAnErrorResponse(res, err)
      })
  } else {
    raiseEntityNotFoundResponse(res, req.params.id)
  }
})

export default router
