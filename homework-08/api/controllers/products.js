import productService from '../services/productService'
import { raiseAnErrorResponse, raiseBadRequestResponse, raiseEntityNotFoundResponse } from './requestUtils'

module.exports.findAllProducts = function findAllProducts (req, res) {
  productService.findAllProducts()
      .then(products => {
        res.json(products)
      })
      .catch(err => {
        raiseAnErrorResponse(res, err)
      })
}

module.exports.findProductById = function findProductById (req, res) {
  productService.findProductById(req.swagger.params.id.value)
      .then(product => {
        if (product) {
            console.log(product)
          res.json(product)
        } else {
          raiseEntityNotFoundResponse(res, req.swagger.params.id.value)
        }
      })
      .catch( err => {
        raiseAnErrorResponse(res, err)
      })
}

module.exports.saveNewProduct = function saveNewProduct (req, res) {
  if (req.body) {
    productService.addNewProduct(req.body.name)
        .then(newProduct => {
          res.status(201).json(newProduct)
        })
        .catch(err => {
          raiseAnErrorResponse(res, err)
        })
  } else {
    raiseBadRequestResponse(res)
  }
}

module.exports.deleteProductById = function deleteProductById (req, res) {
  productService.deleteById(req.swagger.params.id.value)
      .then(deletedProduct => {
        res.status(200).json(deletedProduct)
      })
      .catch(err => {
        raiseAnErrorResponse(res, err)
      })
}

module.exports.findProductsReviews = function findProductsReviews (req, res) {
  productService.findProductById(req.swagger.params.id.value)
      .then(product => {
        if (product) {
          res.json(product.reviews)
        } else {
          raiseEntityNotFoundResponse(res, req.swagger.params.id.value)
        }
      })
      .catch( err => {
        raiseAnErrorResponse(res, err)
      })
}

module.exports.addNewProductReview = function addNewProductReview (req, res) {
  productService.addProductReview(req.swagger.params.id.value, req.body.review)
      .then(newReview => {
        res.json(newReview)
      })
      .catch(err => {
        raiseAnErrorResponse(res, err)
      })
}
