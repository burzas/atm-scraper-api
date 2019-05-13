'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

const APIKEY = process.env.APIKEY || 'abcd';

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    APIKeyHeader: function (req, authOrSecDef, scopesOrApiKey, callback) {
      if (APIKEY === scopesOrApiKey) {
        callback(null);
      } else {
        callback({
          message: "Not Authenticated",
          code: "NOT_AUTHENTICATED",
          statusCode: 401,
          headers: []
        });
      }
    }
  }
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});