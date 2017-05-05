var MongoDB = require('../API/MongooseAPI');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var UserAccount = require('./userAccounts');

var dbConnection = MongoDB.getDBInstance();

var acceptedLogSchema = mongoose.Schema({
  photoID: { type: String, default: '91GyWJn' },,
  foodMass: Number,
  logUser: { type: String, ref: 'UserAccount' },
  imgBarcode: { type: Number, default: -1 },
  ingredientsDetected: [{ type: String }],
  logCreatedAt: { type: Date, default: Date.now },
  calories: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  cholesterol: { type: Number, default: 0 },
  sodium: { type: Number, default: 0 },
  carbohydrates: { type: Number, default: 0 },
  dietFiber: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  vitaminA: { type: Number, default: 0 },
  vitaminC: { type: Number, default: 0 },
  calcium: { type: Number, default: 0 },
  iron: { type: Number, default: 0 },
  servingWeightGrams: { type: Number, default: 0 }
});

acceptedLogSchema.path('foodMass').set(function(num) {
  return num * 100;
});

// TODO:Do a setter for each field (x*foodMass)/serving_weight_grams when creting a new accepted log
