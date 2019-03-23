import mongo from './models/mongo/mongoDB'
import { City, Location } from './models/mongo/City'
import User from './models/mongo/User'
import Product from './models/mongo/Product'

mongo.once('open', function () {
  console.log('MongoDB connection succesful!')
})

function createCity (name, country, capital, lat, long) {
  const newLocation = new Location({
    lat,
    long
  })

  const newCity = new City({
    name,
    country,
    capital,
    location: newLocation
  })

  newCity.save(err => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log(`new City ${name} saved successfully`)
  })
}

function createUser (firstName, lastName, email, password) {
  const newUser = new User({
    firstName,
    lastName,
    email,
    password
  })

  newUser.save(err => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log(`new User ${firstName} ${lastName} saved successfully`)
  })
}

function createProduct (name, reviews) {
  const newProduct = new Product({
    name,
    reviews
  })

  newProduct.save(err => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log(`new Product ${name} saved successfully`)
  })
}

function populateCities () {
  createCity('Brest', 'Belarus', false, 52.183334, 23.166667)
  createCity('Vitebsk', 'Belarus', false, 55.097621, 30.734050)
  createCity('Gomel', 'Belarus', false, 52.441667, 30.98333)
  createCity('Grodno', 'Belarus', false, 53.66667, 23.81667)
  createCity('Minsk', 'Belarus', true, 53.91667, 27.55)
  createCity('Mogilev', 'Belarus', true, 53.91667, 30.35)
}

function populateUsers () {
  createUser('Bob', 'Johnson', 'bob@mail.com', '123456')
  createUser('Jay', 'Mathews', 'jay@mail.com', '654321')
  createUser('Alex', 'Manford', 'alex@mail.com', 'qwerty')
  createUser('John', 'Doe', 'demo@demo.com', 'jd123')
}

function populateProducts () {
  createProduct('Nice Book', ['Awesome!', 'Cool!'])
  createProduct('T-Shirt', ['Nice', 'Cool'])
  createProduct('Black Boots', ['rubbish', 'so ugly'])
}

populateCities()
populateUsers()
populateProducts()

