const Product = require('../models').Product
const Review = require('../models').Review

function findProductById (req, res, next, id) {
    Product.findByPk(id, { include: [ { model: Review, as: 'reviews' } ] })
        .then(product => {
            req.product = product
            next()
        })
}

function findAllProducts (req, res) {
    Product.findAll({ include: [ { model: Review, as: 'reviews' } ] })
        .then(products => {
            res.json(products)
        })
}

function getProduct (req, res) {
    if (req.product === undefined) {
        res.status(404).json({
            success: false,
            reason: `Product with id=${req.params.id} not found`
        })
    } else {
        res.json(req.product)
    }
}

function addNewProduct (req, res) {
    if (req.body !== undefined) {
        Product.create({ name: req.body.name })
            .then(newProduct => {
                res.status(201).json(newProduct)
            })
    } else {
        res.status(404).json({
            success: false,
            reason: 'Missing body'
        })
    }
}

function getReviewsByProduct (req, res) {
    if (req.product === undefined) {
        res.status(404).json({
            success: false,
            reason: `Product with id=${req.params.id} not found`
        })
    } else {
        res.json(req.product.reviews)
    }
}

function addProductReview (req, res) {
    if (req.product) {
        Review.create({ text: req.body.review, productId: req.product.id })
            .then(newReview => {
                req.product.reviews.push(newReview)
                res.json(newReview)
            })
    } else {
        res.status(404).json({
            success: false,
            reason: `Product with id=${req.params.id} not found`
        })
    }
}

export default { findProductById, findAllProducts, getProduct, addNewProduct, getReviewsByProduct, addProductReview }
