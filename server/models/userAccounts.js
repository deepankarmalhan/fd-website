/* Model for a User Account
* Author: Deepankar Malhan
*/

var MongoDB = require('../API/MongooseAPI');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var PendingLog = require('./pendingLogs');
var AcceptedLog = require('./acceptedLogs');

var dbConnection = MongoDB.getDBInstance();

var userAccSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: { type: String, required: true, unique: true },
  passwd: { type: String, require: true },
  userEmail: {type: String, require: true, index: true, unique: true, uniqueCaseInsensitive: true},
  accountCreatedAt: {type: Date, default: Date.now},
  imgurUserAccessToken: { type: String, required: true},
  imgurUserRefreshToken: { type: String, required: true },
  imgurAlbumID: {type: String, required: true},
  pendingLogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'PendingLog'}],
  acceptedLogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'AcceptedLog'}]
});

userAccSchema.plugin(uniqueValidator);

module.exports = dbConnection.model('UserAccount', userAccSchema);
