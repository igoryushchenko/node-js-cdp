import express from 'express'
import productController from '../controllers/productController'

const router = express.Router()

router.use(express.json())

router.param('id', productController.findProductById)

router.get('/', productController.findAllProducts)

router.get('/:id', productController.getProduct)

router.post('/', productController.addNewProduct)

router.delete('/:id', productController.deleteProduct)

router.get('/:id/reviews', productController.getReviewsByProduct)

router.post('/:id/reviews', productController.addProductReview)

export default router
