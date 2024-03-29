var movieModel = require("../models/movieModel.js")
var userDB = require("../models/users.js")

exports.init = function(app) {
    app.get("/IMDb/:title", getFromIMDb);
    app.get("/list/all", getAllLists);
    app.get("/list/:list", getMoviesInList);
    app.get("/movie/list", getList);
    app.get("/movie/add/:list/:title", addMovieToList);
    
    app.put("/newList/:name", createList);            
        app.post("/movie/update/:title/:description/:director/:year/:rating", updateMovie);
    
    app.delete("/movie/delete/:title", deleteList);
}

getList = function(request, response) {
    var message = "All Movies In Your List";    
    response.end(response.render('movieList', {  'title': message,
                                'movieModel': movieModel }))
}

createList = function(request, response) { 
    var listname = request.params.name;
    console.log("LISTNAME IS : " + listname)
    movieModel.createList(listname)
}

updateMovie = function(request, response) { //req.params
    var title = request.params.title

    for (i = 0; i < movieModel.length; i++) {
        var movie = movieModel[i]
        if (movie.title == title) {
            movie.title = request.params.title,
            movie.description = request.params.description,
            movie.director = request.params.director,
            movie.year = request.params.year,
            movie.rating= request.params.rating
        }

        response.end("You've updated the movie " + title)
    }
    response.end("No movie of the name " + title + " was found")
}

deleteList = function(request, response) { //req.params
    var title = request.params.title
    
    for (i = 0; i < movieModel.length; i++) {
        var movie = movieModel[i]
        if (movie.title == title) {
            movieModel.pop(movie)
            response.end(movie.title + " has been deleted")
        }
    }
    response.end("No movie of the name " + title + " was found")
}

addMovieToList = function(request, response) {
    console.log("In add movie route")
    var title = request.params.title
    var list = request.params.list
    movieModel.addMovieToList(list, title)
}
    
getAllLists = function(request, response) {
    console.log("DOES IT GET HERE?")
    movieModel.getArrayOfLists(function(listArray) {
        console.log("ARRAY SHOULD BE: " + listArray.toString().join)
        response.end(listArray.toString())
    });
}

getMoviesInList = function(request, response) {
    var listname = request.params.list
    console.log("LIST NAME PASSED IN IS :" +listname)
    movieModel.getMoviesInList(listname, function(movieArray) {
        response.end(listname +","+ movieArray.toString())
    });
}

getFromIMDb = function(req, resp) {
    var title = req.params.title
    var movie = {};
    
    var request = require('request');
    request('http://www.omdbapi.com/?t=' + title, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body)
        resp.end(body.toString()) 
      }
    })
}
