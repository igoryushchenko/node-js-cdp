class Product {
    constructor (id, name) {
        this._id = id
        this._name = name
        this._reviews = []
    }

    get id () {
        return this._id
    }
    get name () {
        return this._name
    }
    addReview (review) {
        this._reviews.push(review)
    }
    get reviews () {
        return this._reviews
    }
}

export default Product
