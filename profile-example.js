var users = {
	title: "An Example";
	people: [
		{name: "Stephanie"},
		{name: "Jiheh"},
		{name: "Big Ben"}
	]
};

nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', users, function(err, output){
	console.log(output);
});