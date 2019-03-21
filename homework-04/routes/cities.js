import express from 'express'
import citiesController from '../controllers/citiesMongoController'

const router = express.Router()

router.use(express.json())

router.get('/', citiesController.getAllCities)
router.get('/random', citiesController.getRandomCity)
router.post('/', citiesController.addNewCity)
router.put('/:id', citiesController.updateCity)
router.delete('/:id', citiesController.deleteCity)

export default router
