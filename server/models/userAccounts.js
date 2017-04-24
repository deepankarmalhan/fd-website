/* Model for a User Account
* Author: Deepankar Malhan
*/

var MongoDB = require('../API/MongooseAPI');
var mongoose = require('mongoose');

var dbConnection = MongoDB.getDBInstance();

var NameSchema = mongoose.Schema({
  first: String,
  last: String
});

var userAccSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: NameSchema,
  userName: { type: String, required: true, index: { unique: true }},
  passwd: { type: String, require: true },
  userEmail: {type: String, require: true},
  accountCreatedAt: {type: Date, default: Date.now},
  imgurUserAccessToken: String,
  imgurUserRefreshToken: String,
});

module.exports = dbConnection.model('UserAccount', userAccSchema);
