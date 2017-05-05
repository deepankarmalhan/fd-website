module.exports = {
  getUserAccessToken: function(req) {
    var AuthTokens = getAuthorized(req);
    return AuthTokens.imgurUserAccessToken;
  },
  getUserRefreshToken: function(req) {
    var AuthTokens = getAuthorized(req);
    return AuthTokens.imgurUserRefreshToken;
  },
  getAuthorized: function(req) {
    return {
      "imgurUserAccessToken": "test",
      "imgurUserRefreshToken": "test"
    };
  }
};
