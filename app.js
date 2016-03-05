var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var router = require('./routes/');

var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({extended:false});

var app = express();

var port = 3000;
console.log("Starting server on port "+port);
app.listen(port);

app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views', __dirname + '/views/');
swig.setDefaults({cache : false});

app.use(express.static(__dirname + "/public"));
app.use(morgan('combined'));
app.use('/', jsonParser, urlParser, router);