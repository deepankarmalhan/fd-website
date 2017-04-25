var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoDB = require('./API/MongooseAPI');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const expressApp = express();
const PORT = process.env.PORT || 50001;

MongoDB.createConnection(function(dbInstance) {
  expressApp.use(express.static(path.resolve(__dirname, '../client/build')));
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  expressApp.use(bodyParser.json());
  expressApp.use(cookieParser());

  require('./routes')(expressApp, path);

  expressApp.listen(PORT, function() {
    console.log('Listening on port: ', PORT);
  });
});
