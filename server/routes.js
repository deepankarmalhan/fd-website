/* Routes file for the server's API
* Author: Deepankar Malhan
*/

var AuthAPI = require('./API/AuthenticationAPI');
var AcctManageAPI = require('./API/AcctManagementAPI');
var MongoDB = require('./API/MongooseAPI');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var ClarifaiAPI = require('./API/ClarifaiAPI');
var LogManageAPI = require('./API/LogManageAPI');

module.exports = function(expressApp, path) {
  // --------------------------------
  // Set the session middleware
  // --------------------------------
  expressApp.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: MongoDB.getDBInstance(),
      touchAfter: 12 * 3600
    })
  }));

  // -------------------------
  // Authentication Routes
  // -------------------------
  expressApp.post('/api/auth/login', function(req, res) {
    res.set('Content-Type', 'application/json');
    AuthAPI.login(req, function(authObj) {
      if(typeof(authObj.error) === 'undefined') {
        req.session.client = authObj;
        return res.send(JSON.stringify({ message : "Successfully logged in", authenticated: true }));
        }
      res.send(JSON.stringify(authObj));
    });
  });

  expressApp.post('/api/auth/register', function(req, res) {
    res.set('Content-Type', 'application/json');
    AuthAPI.register(req, function(authObj) {
      if(typeof(authObj.error) === 'undefined') {
        req.session.client = authObj;
        return res.send(JSON.stringify({ message : "Successfully registered new account", error: false }));
      }
      res.send(JSON.stringify(authObj));
    });
  });

  expressApp.get('/api/auth/logout', function(req, res) {
    if(req.session.client) {
      req.session.destroy(function(err) {
        if(err) {
          return res.send(JSON.stringify({ message : "Could not logout properly", error: true }));
        }
        return res.send(JSON.stringify({ message : "Successfully logged out", error: false }));
      });
    }
    return res.send(JSON.stringify({ message : "Already logged out", error: true }));
  });

  // ---------------------------------
  // Account management routes
  // ---------------------------------

  expressApp.post('/api/accmanage/updateacc', function(req, res) {
      AcctManageAPI.updateAcc(req, function(updatedAcc) {
        res.set('Content-Type', 'application/json');
        return res.send(JSON.stringify(Object.assign({}, { message: "Successfully updated account" , error: false }, updatedAcc)));
      });
    //res.send(JSON.stringify({ message: "Please login to update your account", error: true }));
  });

  expressApp.post('/api/accmanage/deleteacc', function(req, res) {
    if(req.session.client.userName == req.body.usernamedeleteacc) {
      AcctManageAPI.deleteAcc(req, function(status) {
        res.set('Content-Type', 'application/json');

        if(status.error === true) {
          return res.send(JSON.stringify({ message: "Could not delete account", error: true }));
        }

        return res.send(JSON.stringify({ message: "Successfully deleted account", error: false }));
      });
    }
    res.send(JSON.stringify({ message: "Please re-enter your username properly, or login, to delete your account", error: true }))
  });

  expressApp.post('/api/accmanage/getacctinfo',function(req, res) {
    res.set('Content-Type', 'application/json');
    AcctManageAPI.getAcc(req, function(user) {
      res.send(user);
    });
  });

  expressApp.get('/api/getimgurtoken', function(req, res) {
    res.set('Content-Type', 'application/json');
    AcctManageAPI.getAcc(req, function(user) {
      if(user.error === true) {
        return res.send(user);
      }
      var userImgurToken = user._doc;
      res.send(JSON.stringify({ user_token: userImgurToken.imgurUserAccessToken, imgurAlbumID: userImgurToken.imgurAlbumID }));
    });
  });

  // --------------------------------------------------------------------
  // Create/Update logs
  // --------------------------------------------------------------------

  expressApp.post(`/api/createlog`, function(req, res) {
    res.set('Content-Type', 'application/json');
    // Check if req.body.mode === 'image'
    if(req.body.mode.trim() == 'image') {
      ClarifaiAPI.getImgInfo(req, function(ingredients) {
        LogManageAPI.createNewPendingLog({request: req, ing: ingredients}, function(newLog) {
          if(newLog.error) {
            return res.send({ error: true, msg: "New log couldn't be created" });
          }
          return res.send(Object.assign({}, newLog, { error: false}));
        });
        return;
      });
      return;
    }
    else if(req.body.mode == 'barcode') {
      // Do nutritionix here
    }
    res.send(JSON.stringify({ error: true, msg: `Could not find a proper mode to add a new log, mode sent was ${req.body.mode}`}));
  });

  // -------------------------------------------------------------------------
  // All remaining requests return to the React App so it can handle routing
  // -------------------------------------------------------------------------
  expressApp.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
};
