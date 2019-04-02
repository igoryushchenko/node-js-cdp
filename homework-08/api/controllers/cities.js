import citiesService from '../services/citiesService'
import { raiseBadRequestResponse, raiseAnErrorResponse } from './requestUtils'

module.exports.findAllCities = function findAllCities (req, res) {
  citiesService.getAllCities()
    .then(cities => {
      res.json(cities)
    })
    .catch(err => {
      raiseAnErrorResponse(res, err)
    })
}

module.exports.findRandomCity = function findRandomCity (req, res) {
  citiesService.getRandomCity()
      .then(cities => {
        res.json(cities[0])
      })
      .catch(err => {
        raiseAnErrorResponse(res, err)
      })
}

module.exports.saveNewCity = function saveNewCity (req, res) {
  if (req.body) {
    citiesService.addNewCity(req.body)
        .then(newCity => {
          res.status(201).json(newCity)
        })
        .catch(err => {
          raiseAnErrorResponse(res, err)
        })
  } else {
    raiseBadRequestResponse(res)
  }
}

module.exports.updateCity = function updateCity (req, res) {
  if (req.body) {
    citiesService.updateCity(req.swagger.params.id.value, req.body)
        .then(cityUpdated => {
          res.status(201).json(cityUpdated)
        })
        .catch(err => {
          raiseAnErrorResponse(res, err)
        })
  } else {
    raiseBadRequestResponse(res)
  }
}

module.exports.deleteCity = function deleteCity (req, res) {
  citiesService.deleteCity(req.swagger.params.id.value)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        raiseAnErrorResponse(res, err)
      })
}
