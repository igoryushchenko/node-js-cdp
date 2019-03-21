import express from 'express'
import productController from '../controllers/productController'
import productMongoController from '../controllers/productMongoController'

const useMongo = process.env.useMongoAsDb
const router = express.Router()

router.use(express.json())

router.param('id', useMongo ? productMongoController.findProductById : productController.findProductById)

router.get('/', useMongo ? productMongoController.findAllProducts : productController.findAllProducts)

router.get('/:id', useMongo ? productMongoController.getProduct : productController.getProduct)

router.post('/', useMongo ? productMongoController.addNewProduct : productController.addNewProduct)

router.delete('/:id', useMongo ? productMongoController.deleteProduct : productController.deleteProduct)

router.get('/:id/reviews', useMongo ? productMongoController.getReviewsByProduct : productController.getReviewsByProduct)

router.post('/:id/reviews', useMongo ? productMongoController.addProductReview : productController.addProductReview)

export default router
