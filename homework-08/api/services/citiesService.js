import { City } from '../models/mongo/City'

function getRandomCity () {
  return new Promise((resolve, reject) => {
    City.aggregate([{ $sample: { size: 1 } }], (err, city) => {
      if (err) {
        reject(err)
      } else {
        resolve(city)
      }
    })
  })
}

function getAllCities () {
  return new Promise((resolve, reject) => {
    City.find((err, cities) => {
      if (err) {
        reject(err)
      } else {
        resolve(cities)
      }
    })
  })
}

function addNewCity (newCityReq) {
  return new Promise((resolve, reject) => {
    const newCity = new City(
      newCityReq
    )
    newCity.save(err => {
      if (err) {
        reject(err)
      }
      console.log(`new City ${newCityReq.name} saved successfully`)
      resolve(newCity)
    })
  })
}

function updateCity (cityId, cityUpdated) {
  return new Promise((resolve, reject) => {
    City.findByIdAndUpdate(cityId, cityUpdated, { upsert: true }, err => {
      if (err) {
        reject(err)
      }
      resolve(cityUpdated)
    })
  })
}

function deleteCity (cityId) {
  return new Promise((resolve, reject) => {
    City.findByIdAndRemove(cityId, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

export default { getRandomCity, getAllCities, addNewCity, updateCity, deleteCity }
