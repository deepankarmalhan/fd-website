/* Custom MongoDB API to access the same connection across the whole Node application
* Author: Deepankar Malhan
*/

var mongoose = require('mongoose');

var MongoDB;
var connectionURI = process.env.MONGODB_URI || `mongodb://localhost:${process.env.TEST_DB_PORT}/${process.env.TEST_DB_NAME}`;
var connectionOptions = { promiseLibrary: require('bluebird')};

module.exports = {
  createConnection: function(callback) {
    MongoDB = mongoose.createConnection(connectionURI, connectionOptions);
    return callback(MongoDB);
  },
  getDBInstance: function() {
    return MongoDB;
  }
};
