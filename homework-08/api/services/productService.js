import ProductSql from '../models/Product'
import ReviewSql from '../models/Review'
import ProductMongo from '../models/mongo/Product'

const useMongo = process.env.useMongoAsDb

function findProductById (id) {
  if (useMongo) {
    return new Promise((resolve, reject) => {
      ProductMongo.findById(id, (err, product) => {
        if (err) {
          reject(err)
        }
        resolve(product)
      })
    })
  } else {
    return ProductSql.findByPk(id, { include: [ { model: ReviewSql, as: 'reviews' } ] })
  }
}

function findAllProducts () {
  if (useMongo) {
    return new Promise((resolve, reject) => {
      ProductMongo.find((err, products) => {
        if (err) {
          reject(err)
        }
        resolve(products)
      })
    })
  } else {
    return ProductSql.findAll({ include: [ { model: ReviewSql, as: 'reviews' } ] })
  }
}

function addNewProduct (name) {
  if (useMongo) {
    return new Promise((resolve, reject) => {
      ProductMongo.create({
        name,
        reviews: []
      }, (err, newProduct) => {
        if (err) {
          reject(err)
        }
        resolve(newProduct)
      })
    })
  } else {
    return ProductSql.create({ name })
  }
}

function deleteById(productId) {
  if (useMongo) {
    return new Promise((resolve, reject) => {
      ProductMongo.remove({_id: productId}, (err, deletedProduct) => {
        if (err) {
          reject(err)
        }
        resolve(deletedProduct)
      })
    })
  } else {
    return ProductSql.destroy({
      where: {
        id: productId
      }
    })
  }
}

function addProductReview (productId, review) {
  if (useMongo) {
    return findProductById(productId)
        .then(product => {
          return new Promise((resolve, reject) => {
            product.reviews.push(review)
            product.save(err => {
              if (err) {
                reject(err)
              }
              resolve({review})
            })})
        })
  } else {
    let reviewPromise = ReviewSql.create({ text: review, productId })
    return reviewPromise.then(newReview => {
      return new Promise((resolve, reject) => {
        product.reviews.push(newReview)
        resolve({review})
      })
    })
  }
}

export default { findProductById, findAllProducts, addNewProduct, deleteById, addProductReview }
