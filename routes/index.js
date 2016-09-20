var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res){
	var userName = req.params.name;
	var list = tweetBank.find(function(x) { 
		return x.name === userName;
	});

	res.render('index',{ tweets: list, curUser: userName, showForm: true, showName: true});
});

router.get('/tweets/:id', function(req, res){
	var id = +req.params.id;
	var list = tweetBank.find(function(x) { 
		return x.id === id;
	});
	res.render('index', {tweets: list});
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;

//why do we need next sometimes? 