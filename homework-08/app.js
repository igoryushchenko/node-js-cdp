require('babel-register')
require('dotenv').config()
var SwaggerExpress = require('swagger-express-mw')
var app = require('express')()
module.exports = app
app.use(require('express').json())

const verifyJWT = require('./api/helpers/verifyJWT').verifyJwt

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
      verifyToken: function (req, authOrSecDef, scopesOrApiKey, callback) {
        return verifyJWT(req, callback)
      }
    }
}

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err }

  if (process.env.useMongoAsDb) {
    require('./api/models/mongo/mongoDB')
  } else {
    const db = require('./api/models/index')
    db.sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.')
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err)
      })
    }
  // install middleware
  swaggerExpress.register(app)

  var port = process.env.PORT || 10010
  app.listen(port)
})
