/* Authentication module to be used by the server API for authentication routes
* Author: Deepankar Malhan
*/

var bcrypt = require('bcryptjs');
var ImgurAPI = require('./ImgurAPI');
var UserAccount = require('../models/userAccounts');
var mongoose = require('mongoose');

module.exports = {
  login: function(req, callback) {

    UserAccount.findOne({userName: req.body.usernamelogin}, function(err, user) {
      if(err || !user) {
        return callback(err);
      }

      bcrypt.compare(req.body.passwdlogin, user.passwd, function(err, response) {
        if(err) {
          return callback({"message": "Error comparing the passwords for login"});
        }

        let tempUser = user;
        tempUser.passwd = null;

        if(response === true) {
          return callback(tempUser);
        }

        return callback({
          "message": "Wrong password",
          "authenticated": false
        });
      });
    });
  },
  register: function(req, callback) {
    // TODO: Check if the required fields are filled or not.
    if(
      !req.body.usernameregister ||
      !req.body.passwdregister ||
      !req.body.useremailregister
    ) {
      return callback({
        "message": "Please fill out all the required fields",
        "registered": false
      });
    }

    bcrypt.hash(req.body.passwdregister, 10, function(err, hash) {
      if(err) {
        return callback(err);
      }

      let newUser = {
        __id: mongoose.Types.ObjectId(),
        firstName: req.body.firstnameregister,
        lastName: req.body.lastnameregister,
        userName: req.body.usernameregister,
        passwd: hash,
        userEmail: req.body.useremailregister,
        imgurUserAccessToken: 'ImgurAPI.getUserAccessToken(req)',
        imgurUserRefreshToken: 'ImgurAPI.getUserRefreshToken(req)'
      };

      let newUserDocument = new UserAccount(newUser);
      newUserDocument.save(function(err) {
        if (err) {
          return callback(err);
        }

        // Sanitize the newUserDocument before sending it to the callback
        delete newUser.passwd;
        return callback(newUser);
      });
    });
  }
};
