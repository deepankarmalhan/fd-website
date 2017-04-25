/* Routes file for the server's API
* Author: Deepankar Malhan
*/

var AuthAPI = require('./API/AuthenticationAPI');

module.exports = function(expressApp, path) {
  // -------------------------
  // Authentication Routes
  // -------------------------
  expressApp.post('/api/auth/login', function(req, res) {
    res.set('Content-Type', 'application/json');
    console.log(`[INFO]: Login route activated, request is: ${req.body.usernamelogin} and ${req.body.passwdlogin}`);
    AuthAPI.login(req, function(authObj) {
      console.log(`Returned from the login function, getting ready to send back ${JSON.stringify(authObj)}`);
      res.send(JSON.stringify(authObj));
    });
  });

  expressApp.post('/api/auth/register', function(req, res) {
    res.set('Content-Type', 'application/json');
    AuthAPI.register(req, function(authObj) {
      res.send(JSON.stringify(authObj));
    });
  });

  // -------------------------------------------------------------------------
  // All remaining requests return to the React App so it can handle routing
  // -------------------------------------------------------------------------
  expressApp.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    res.send('Hello World!');
  });
};
