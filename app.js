var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();


// Set the views directory
app.set('views', './views');

// Define the view (templating) engine
app.set('view engine', 'ejs');	

// Load all routes in the routes directory
fs.readdirSync('./routes').forEach(function (file){
  // There might be non-js files in the directory that should not be loaded
  if (path.extname(file) == '.js') {
    console.log("Adding routes in "+file);
  	require('./routes/'+ file).init(app);
  	}
});

// Handle static files
app.use(express.static('./public'));
  
// Catch any routes not already handed with an error message
app.use(function(req, res) {
	var message = 'Error, did not understand path '+req.path;
	// Set the status to 404 not found, and render a message to the user.
  res.status(404).render('error', { 'message': message });
});

// Boilerplate for setting up socket.io alongside Express.
var httpServer = require('http').createServer(app);

httpServer.listen(50000, function() {
  console.log("Server listening at http://localhost:50000/");
  });