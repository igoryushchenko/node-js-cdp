import express from 'express'
import citiesController from '../controllers/citiesMongoController'
import { raiseBadRequestResponse, raiseAnErrorResponse } from './requestUtils'

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  citiesController.getAllCities()
    .then(cities => {
      res.json(cities)
    })
    .catch(err => {
      raiseAnErrorResponse(res, err)
    })
})

router.get('/random', (req, res) => {
  citiesController.getRandomCity()
    .then(cities => {
      res.json(cities)
    })
    .catch(err => {
      raiseAnErrorResponse(res, err)
    })
})

router.post('/', (req, res) => {
  if (req.body) {
    citiesController.addNewCity(req.body)
      .then(newCity => {
        res.status(201).json(newCity)
      })
      .catch(err => {
        raiseAnErrorResponse(res, err)
      })
  } else {
    raiseBadRequestResponse(res)
  }
})

router.put('/:id', (req, res) => {
  if (req.body) {
    citiesController.updateCity(req.params['id'], req.body)
      .then(cityUpdated => {
        res.status(201).json(cityUpdated)
      })
      .catch(err => {
        raiseAnErrorResponse(res, err)
      })
  } else {
    raiseBadRequestResponse(res)
  }
})

router.delete('/:id', (req, res) => {
  citiesController.deleteCity(req.params['id'])
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      raiseAnErrorResponse(res, err)
    })
})

export default router
