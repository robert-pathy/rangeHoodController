var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(function(req, res) {
//  res.status(404).send({url: req.originalUrl + ' not found'})
//});

var routes = require('./api/routes/rangeHoodControlRoutes');
routes(app);

app.listen(port);

console.log('Range Hood Controller RESTful API server started on: ' + port);
