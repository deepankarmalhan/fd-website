/* Custom MongoDB API to access the same connection across the whole Node application
* Author: Deepankar Malhan
*/

var mongoose = require('mongoose');
var Promise = require('bluebird');

var MongoDB;
var connectionURI = process.env.MONGODB_URI || `mongodb://localhost:27017/devtestdb`;
var connectionOptions = { promiseLibrary: Promise };

module.exports = {
  createConnection: function(callback) {
    MongoDB = mongoose.createConnection(connectionURI, connectionOptions);
    return callback(MongoDB);
  },
  getDBInstance: function() {
    return MongoDB;
  }
};
