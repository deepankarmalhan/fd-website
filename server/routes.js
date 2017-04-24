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
    AuthAPI.login(req, function(authObj) {
      res.send(JSON.stringify(authObj));
    });
  });

  // -------------------------------------------------------------------------
  // All remaining requests return to the React App so it can handle routing
  // -------------------------------------------------------------------------
  expressApp.get('*', function(req, res) {
    //res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    res.send('Hello World!');
  });
};
