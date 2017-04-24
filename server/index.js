var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoDB = require('./API/MongooseAPI');

const expressApp = express();
const PORT = process.env.PORT || 50001;

MongoDB.createConnection(function(dbInstance) {
  expressApp.use(express.static(path.resolve(__dirname, '../client/build')));
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  expressApp.use(bodyParser.json());

  require('./routes')(expressApp, path);

  expressApp.listen(PORT, function() {
    console.log('Listening on port: ', PORT);
  });
});
