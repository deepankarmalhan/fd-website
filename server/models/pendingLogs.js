var MongoDB = require('../API/MongooseAPI');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var UserAccount = require('./userAccounts');

var dbConnection = MongoDB.getDBInstance();

var pendingLogSchema = mongoose.Schema({
  foodMass: Number,
  photoRef: String,
  photoThumbnail: String,
  photoId: { type: String },
  logMode: String,
  ingredientsDetected: [{ type: String }],
  imgBarcode: Number,
  logUser: { type: String, ref: 'UserAccount' }
});

pendingLogSchema.path('foodMass').set(function(num) {
  return num * 100;
});

pendingLogSchema.path('foodMass').get(function(num) {
  return (num/100).toFixed(2);
})

pendingLogSchema.plugin(uniqueValidator);

module.exports = dbConnection.model('PendingLog', pendingLogSchema);
