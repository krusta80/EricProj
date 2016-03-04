var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var app = express();

var port = 3000;

console.log("Starting server on port "+port);
app.listen(port);

app.use(express.static(__dirname + "/public"));
app.use(morgan('combined'));
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({extended:false});