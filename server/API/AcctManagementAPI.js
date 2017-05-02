var UserAccount = require('../models/userAccounts');
var bcrypt = require('bcryptjs');

module.exports = {
  updateAcc: function(req, callback) {

    var newDoc = {
      firstName: req.body.firstnameupdate,
      lastName: req.body.lastnameupdate,
      userName: req.body.usernameupdate,
      userEmail: req.body.useremailupdate
    };

    // If password was changed, hash and salt the new passwd and add it to the new doc
    if(req.body.passwdupdate) {
      var newPass = bcrypt.hash(req.body.passwdupdate, 10, function(err, hash) {
        return hash;
      });
      Object.assign(newDoc, { passwd: newPass});
    }

    UserAccount.findOneAndUpdate({userName: req.body.usernameupdate}, newDoc, {
      new: true
    }, function (err, doc) {
      if(err || !doc) {
        return callback(Object.assign({}, {error: true}, err));
      }
      // Successfully updated doc
      var newUser = doc;
      newUser.passwd = null;
      return callback(Object.assign({}, newUser, { error: false }));
    });
  },

  deleteAcc: function(req, callback) {
    UserAccount.findOneAndRemove({ userName: req.body.usernamedeleteacc}, function(err, doc) {
      if(err || !doc) {
        return callback(Object.assign({}, {error: true}, err));
      }
      return callback({error: false, message: 'Successfully deleted account'});
    })
  },

  getAcc: function(req, callback) {
    UserAccount
    .findOne({userName: req.body.username})
    .populate('pendingLogs')
    .exec(function(err, doc) {
      if(!doc) {
        return callback(Object.assign({}, {error: true, msg: 'Could not find the user'}));
      }

      var modifiedDoc = doc;
      modifiedDoc.passwd = null;
      return callback(Object.assign({}, {error: false}, modifiedDoc));
    });
  }
};
