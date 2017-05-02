var UserAccount = require('../models/userAccounts');
var PendingLog = require('../models/pendingLogs');

module.exports = {
  createNewPendingLog: function(req, callback) {
    UserAccount.findOne({ userName: req.request.body.username }, function(err, user) {
      if(err || !user) {
        console.log(`Couldn't find a user to add a new pending log to.`);
        return callback({ error: true });
      }

      console.log(`Found a user, creating new log for: ${JSON.stringify(user)}`);
      // Found a user, now create a new pending log for them
      var newLog = {
        foodMass: req.request.body.mass,
        logMode: req.request.body.mode,
        ingredientsDetected: req.ing,
        logUser: req.request.body.username
      };

      if(req.request.body.upc) {
        newLog.imgBarcode = req.request.body.upc;
      }

      if(req.request.body.imageid){
        newLog.photoId = req.request.body.imageid;
        newLog.photoRef= `http://i.imgur.com/${req.request.body.imageid}.jpg`;
        newLog.photoThumbnail= `http://i.imgur.com/${req.request.body.imageid}m.jpg`;
      }

      console.log(`Created a new pendingLog: ${JSON.stringify(newLog)}`);
      var pendingLog = new PendingLog(newLog);

      // Done creating a log, push it to user's pendingLogs and save the new user doc
      user.pendingLogs.push(pendingLog);
      console.log(`Pushed the new pending log to user's pending log list, new log pushed was: ${JSON.stringify(pendingLog)}`);
      user.save(function(err, newUser) {
        if(err) {
          console.log(`Error occured while saving the doc after pushing new log on it`);
          return callback({ error: true });
        }
        console.log(`New user with the pending log successfully saved, trying to save the new log itself. New user is: ${JSON.stringify(newUser)}`);
        pendingLog.save(function(err) {
          if(err) {
            console.log(`Couldn't save the new log, error is: ${JSON.stringify(err)}`);
            return callback({ error: true });
          }
          console.log(`Successfully saved the new log and the new user`);
          return callback({ error: false });
        })
      });
    });
  }
};
