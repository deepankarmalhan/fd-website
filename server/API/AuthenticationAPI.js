/* Authentication module to be used by the server API for authentication routes
* Author: Deepankar Malhan
*/

var bcrypt = require('bcryptjs');
var UserAccount = require('../models/userAccounts');

module.exports = {
  login: function(req, callback) {
    UserAccount.findOne({userName: req.body.usernamelogin}).then(function(err, user) {
      if(err || !user) {
        return callback({
          "message": "Wrong username",
          "authenticated": false
        });
      }

      bcrypt.compare(req.body.passwdlogin, user.passwd, function(response) {
        if(response === true) {
          console.log(`Bcrypt res===true`)
          return callback({
            "message": "User Authenticated",
            "authenticated": true
          });
        }

        return callback({
          "message": "Wrong password",
          "authenticated": false
        });
      });
    });
  },
  register: function(req) {

  }
};
