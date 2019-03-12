class User {
    constructor (name, email) {
        this._name = name
        this._email = email
    }

    get name () {
        return this._name
    }
    get email () {
        return this._email
    }

    toJSON () {
        return { name: this.name, email: this.email }
    }
}

export default User
