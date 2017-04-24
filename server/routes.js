/* Routes file for the server's API
* Author: Deepankar Malhan
*/

module.exports = function(expressApp, path) {
  // -------------------------
  // Authentication Routes
  // -------------------------
  expressApp.post('/api/auth/login', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message": "Hello World!"}');
  });

  // -------------------------------------------------------------------------
  // All remaining requests return to the React App so it can handle routing
  // -------------------------------------------------------------------------
  expressApp.get('*', function(req, res) {
    //res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    res.send('Hello World!');
  });
};
