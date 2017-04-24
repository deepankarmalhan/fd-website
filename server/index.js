var express = require('express');
var path = require('path');

const expressApp = express();
const PORT = process.env.PORT || 50001;

expressApp.use(express.static(path.resolve(__dirname, '../client/build')));

require('./routes')(expressApp, path);

expressApp.listen(PORT, function() {
  console.log('Listening on port: ', PORT);
})
