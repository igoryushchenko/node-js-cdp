require('dotenv').config()

module.exports = {
    'username': process.env.dbUser,
    'password': process.env.dbPassword,
    'database': process.env.dbName,
    'host': process.env.dbHost,
    'dialect': process.env.dbDialect
}
