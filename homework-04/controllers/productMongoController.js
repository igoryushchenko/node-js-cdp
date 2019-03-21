import Product from '../models/mongo/Product'

function findProductById (req, res, next, id) {
  Product.findById(id, (err, product) => {
    if (err) {
      console.log(`Product with id=${id} not found`)
      next()
    } else {
      req.product = product
      next()
    }
  })
}

function getProduct (req, res) {
  if (req.product) {
    res.json(req.product)
  } else {
    res.status(404).json({
      success: false,
      reason: `Product with id=${req.params.id} not found`
    })
  }
}

function findAllProducts (req, res) {
  Product.find((err, products) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        code: 500,
        message: 'Something went wrong'
      })
    } else {
      res.json(products)
    }
  })
}

function addNewProduct (req, res) {
  if (req.body) {
    Product.create({
      name: req.body.name,
      reviews: []
    }, (err, newProduct) => {
      if (err) {
        console.log(err)
        res.status(500).json({
          code: 500,
          message: 'Something went wrong'
        })
      } else {
        res.status(201).json(newProduct)
      }
    })
  } else {
    res.status(404).json({
      success: false,
      reason: 'Missing body'
    })
  }
}

function deleteProduct (req, res) {
  if (req.product) {
    req.product.remove(err => {
      if (err) {
        console.log(err)
        res.status(500).json({
          success: false,
          reason: 'Delete failed'
        })
      } else {
        res.status(200).json({
          success: true,
          reason: 'Product deleted'
        })
      }
    })
  } else {
    res.status(404).json({
      success: false,
      reason: 'Product not found'
    })
  }
}

function getReviewsByProduct (req, res) {
    if (req.product) {
      res.json(req.product.reviews)
    } else {
      res.status(404).json({
        success: false,
        reason: `Product with id=${req.params.id} not found`
      })
    }
}

function addProductReview (req, res) {
    if (req.product) {
      req.product.reviews.push(req.body.review)
      req.product.save(err => {
        if (err) {
          console.log(err)
          res.status(500).json({
            code: 500,
            message: 'Something went wrong'
          })
        } else {
          res.json({ text: req.body.review })
        }
      })
    } else {
        res.status(404).json({
            success: false,
            reason: `Product with id=${req.params.id} not found`
        })
    }
}

export default { findProductById, findAllProducts, getProduct, addNewProduct, getReviewsByProduct, addProductReview, deleteProduct }
