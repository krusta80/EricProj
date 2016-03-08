var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
swig.setDefaults({cache : false});
var bodyParser = require('body-parser');
var router = require('./routes/');


var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.engine('html',swig.renderFile);
app.set('view engine','html');

app.use(morgan('combined'));
app.use('/', router);//use this for /products.. put home route here.

var port = process.env.PORT || 3000;
console.log("Starting server on port "+port);
app.listen(port);//separate this into a server file



