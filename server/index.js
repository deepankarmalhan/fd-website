var express = require('express');
var path = require('path');
var MongoDB = require('./API/MongooseAPI');

const expressApp = express();
const PORT = process.env.PORT || 50001;

MongoDB.createConnection(function(dbInstance) {
  expressApp.use(express.static(path.resolve(__dirname, '../client/build')));

  require('./routes')(expressApp, path);

  expressApp.listen(PORT, function() {
    console.log('Listening on port: ', PORT);
  });
});
