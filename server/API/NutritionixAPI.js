var rp = require('request-promise');

module.exports = {
  getIngredients: function(req, callback) {
    rp({
      method: 'GET',
      uri: `https://api.nutritionix.com/v1_1/item?upc=${req.body.upc}&appId=${process.env.NUTRITIONIX_APP_ID}&appKey=${process.env.NUTRITIONIX_APPP_KEY}`
    }).then((data) => {
      var jsonData = JSON.parse(data);
      console.log(`Talked to NutritionixAPI, result was: ${data}`);
      var ingredients = jsonData.nf_ingredient_statement.split(',');
      console.log(`Ingredients split from the data are: ${ingredients}`);
      return callback(ingredients);

    }).catch((err) => {
      console.log(`Error occured in NutritionixAPI, ${err}`)
      return callback(Object.assign({}, err, { error: true }));
    });
  }
}
