var express = require('express');
var app = express();
var volleyball = require('volleyball');
var nunjucks = require('nunjucks');
var routes = require('./routes/');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

var users = {
	title: "An Example",
	message: "Welcome to your profile!",
	people: [
		{name: "Stephanie"},
		{name: "Jiheh"},
		{name: "Big Ben"}
	]
};

nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

//BodyParser - copied
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use(function(req, res) {
// 	res.setHeader('Content-Type', 'text/plain');
// 	res.write('you posted:\n');
//   res.end(JSON.stringify(req.body, null, 2));
// });

//Status Code
app.use(function (req, res, next) {
	console.log(req.method, req.path, res.status(200).statusCode);
	next();
});

app.use('/special', function (req, res, next) {
	console.log("You are in a special area.");
	next();
});

//Render all static files in public directory
app.use(express.static('public'));

var server = app.listen(3000);
var io = socketio.listen(server);

//Send all GET requests through router
app.use('/', routes(io));

