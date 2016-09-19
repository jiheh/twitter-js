var express = require('express');
var app = express();
var volleyball = require('volleyball');
var nunjucks = require('nunjucks');

var users = {
	title: "An Example",
	people: [
		{name: "Stephanie"},
		{name: "Jiheh"},
		{name: "Big Ben"}
	]
};

nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks


app.use(function (req, res, next) {
	console.log(req.method, req.path, res.status(200).statusCode);
	next();
});

app.use('/special', function (req, res, next) {
	console.log("You are in a special area.");
	next();
});

app.get('/', function(req, res, next) {
	res.render('index', users);
});

app.get('/news', function(req, res, next) {
	res.sendStatus(200);
});


app.listen(3000);