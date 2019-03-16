import fs from 'fs'

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
    get password () {
        return this._password
    }
    set password (password) {
        this._password = password
    }
    get id () {
        return this._id
    }
    set id (password) {
        this._id = password
    }

    toJSON () {
        return { name: this.name, email: this.email }
    }

    static getUsersDB () {
        const usersDb = []
        const fileDb = JSON.parse(fs.readFileSync('./models/usersDB.json', 'utf8'))
        for (let obj of fileDb) {
            usersDb.push(Object.assign(new User(), obj))
        }
        return usersDb
    }
}

export default User
