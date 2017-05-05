var Clarifai = require('clarifai');
var clarifaiApp = new Clarifai.App(
  process.env.CLARIFAI_CLIENT_ID,
  process.env.CLARIFAI_CLIENT_SECRET
);

module.exports = {
  getImgInfo: function(req, callback) {
    clarifaiApp.models.predict('bd367be194cf45149e75f01d59f77ba7', `http://i.imgur.com/${req.body.imageid}.jpg`).then((res)=> {
      // Extract data out of the prediction
      // Find the pending logs for req.body.username
      // Create an array of pending logs from Model, save them to the user
        // Pending logs will have - ref to the image thumbnail (add m to the above template string),
        // - mass - mode (image in this case) - Ingredients (array of strings)
        // - username (ref to UserAccount)
      // Callback with the new log, or error: false, msg: 'successful'
      let tempIng = [];

      res.outputs[0].data.concepts.forEach(function(element) {
          tempIng.push(element.name);
      });

      return callback(tempIng);
    },
    (err) => {
      if(err) {
        callback({ error: true, msg: 'Error occured while calling Clarifai API' });
      }
    });
  }
};
