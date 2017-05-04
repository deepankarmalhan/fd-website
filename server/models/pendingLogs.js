var MongoDB = require('../API/MongooseAPI');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var UserAccount = require('./userAccounts');

var dbConnection = MongoDB.getDBInstance();

var pendingLogSchema = mongoose.Schema({
  foodMass: Number,
  photoRef: { type: String, default: `http://i.imgur.com/91GyWJn.jpg`},
  photoThumbnail: { type: String, default: `http://i.imgur.com/91GyWJnm.jpg`},
  photoId: { type: String, default: '91GyWJn' },
  logMode: String,
  ingredientsDetected: [{ type: String }],
  imgBarcode: { type: Number, default: -1 },
  logUser: { type: String, ref: 'UserAccount' },
  logCreatedAt: { type: Date, default: Date.now }
});

pendingLogSchema.path('foodMass').set(function(num) {
  return num * 100;
});

pendingLogSchema.path('foodMass').get(function(num) {
  return (num/100).toFixed(2);
})

pendingLogSchema.plugin(uniqueValidator);

module.exports = dbConnection.model('PendingLog', pendingLogSchema);
