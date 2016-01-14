var express = require('express');
var validator = require('validator');
var app = express();
var urlOptions = {
  protocols: ['http', 'https'],
  require_protocol: true,
  allow_underscores: true
};
var path = process.cwd();

//mongoose connection
var mongoose = require('mongoose');

mongoose.connect('mongodb://administrator:admin@ds045475.mongolab.com:45475/urldb');
var db = mongoose.connection;
var Schema = mongoose.Schema;
mongoose.model('url',
  new Schema({
    url: String,
    short_url: String
  }),
  'shortened');

// load middleware

var newUrl = require(path + '/middleware/new-url.js');
var redirect = require(path + '/middleware/redirect.js');

//app routes

app.set('json spaces', 0);

app.get('/', function(req, res) {


  res.sendfile(path + '/client/index.html');

});



app.get('/new/*', function(req, res, next) {

  var url = req.url.substring(5, this.length);


  if (validator.isURL(url, urlOptions)) {

    next();
  }
  else {

    res.json({
      "error": "URL invalid"
    });
  }


});

newUrl(app, {
  mongoose: mongoose,
  db: db
});

redirect(app, {
  mongoose: mongoose,
  db: db
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");
