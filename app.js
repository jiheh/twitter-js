var express = require('express');
var app = express();
var volleyball = require('volleyball');

app.use(function (req, res, next) {
	console.log(req.method, req.path, res.status(200).statusCode);
	next();
});

app.use('/special', function (req, res, next) {
	console.log("You are in a special area.");
	next();
});

app.get('/', function(req, res, next) {
	res.send('hello world');
});

app.get('/news', function(req, res, next) {
	res.sendStatus(200);
});

app.listen(3000);