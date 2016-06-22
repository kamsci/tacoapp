var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var morgan = require('morgan');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res) {
  res.render('index');
});

app.use('/tacos', require('./controllers/tacos'));

// if (!module.parent) {
  var server = app.listen(process.env.PORT || 3000);
// }

module.exports = server;
