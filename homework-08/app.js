require('babel-register')
require('dotenv').config()
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing
app.use(require('express').json())
var config = {
  appRoot: __dirname // required config
}

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

    swaggerExpress.runner.config.swagger.securityHandlers = {
        token: function (req, authOrSecDef, scopesOrApiKey, callback) {
            // ...
        }
    }
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
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

});
