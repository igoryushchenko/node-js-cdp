import { City } from '../models/mongo/City'

function getRandomCity (req, res) {
  City.aggregate([{ $sample: { size: 1 } }], (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        code: 500,
        message: 'Something went wrong'
      })
    } else {
      res.json(data)
    }
  })
}

function getAllCities (req, res) {
  City.find((err, cities) => {
    if (err) {
      res.status(500).json({
        code: 500,
        message: 'Something went wrong'
      })
    } else {
      res.json(cities)
    }
  })
}

function addNewCity (req, res) {
  if (req.body) {
    const newCity = new City(
      req.body
    )

    newCity.save(err => {
      if (err) {
        console.log(err)
        throw err
      }
      console.log(`new City ${req.body.name} saved successfully`)
    })
    res.status(201).json(newCity)
  } else {
    res.status(404).json({
      success: false,
      reason: 'Missing body'
    })
  }
}

function updateCity (req, res) {
  if (req.body) {
    City.findByIdAndUpdate(req.params['id'], req.body, { upsert: true }, err => {
      if (err) {
        res.status(500).json({
          success: false,
          reason: 'Update failed'
        })
      } else {
        res.status(201).json({
          success: true,
          reason: 'Update successful'
        })
      }
    })
  } else {
    res.status(404).json({
      success: false,
      reason: 'Missing body'
    })
  }
}

function deleteCity (req, res) {
  City.findByIdAndRemove(req.params['id'], (err, data) => {
    if (err) {
      res.status(500).json({
        code: 500,
        message: 'Something went wrong'
      })
    } else {
      console.log(res)
      res.json({
        code: 200,
        message: 'Successfully deleted'
      })
    }
  })
}

export default { getRandomCity, getAllCities, addNewCity, updateCity, deleteCity }
