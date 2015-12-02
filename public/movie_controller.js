function addList(event) {
    event.preventDefault();
    
    var name = $("#listName").val();
    console.log("NAME HERE IS: " + name)

    $.ajax({
        url: '/newList/'+name,
        type: 'PUT',
        success: function(result) {           
            
//            document.getElementById("addMovieList").reset()
            alert(result);
        }
    });
}
 
function findMovieInIMDB(event)  {
    event.preventDefault();
    
    var title = $("#getTitle").val();
    $("#returned-movie").empty();
    if (title.length >= 1) {
        
        var movie = {};
        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: 'http://www.omdbapi.com/?t=' + title,
            statusCode: {
                403: function () {
                    console.log('HTTP 403 Forbidden!')
                }
            },
            success: function (result) {
                var movie = JSON.parse(result)
                $("#returned-movie").append(
                    "Title: " + movie.Title + "<br>" +
                    "Year: " + movie.Year + "<br>" +
                    "Rated: " + movie.Rated + "<br>" +
                    "Released: " + movie.Released + "<br>" +
                    "Runtime: " + movie.Runtime + "<br>" +
                    "Genre: " + movie.Genre + "<br>" +
                    "Director: " + movie.Director + "<br>" +
                    "Writer: " + movie.Writer + "<br>" +
                    "Actors: " + movie.Actors + "<br>" +
                    "Plot: " + movie.Plot + "<br>" +
                    "Language: " + movie.Language + "<br>" +
                    "Country: " + movie.Country + "<br>" +
                    "Awards: " + movie.Awards + "<br>" +
                    "Poster: <img src ='" + movie.Poster + "'><br>" +
                    "imdbRating: " + movie.imdbRating + "<br>" +
                    "imdbVotes: " + movie.imdbVotes +"<br>"
                )
                $("#returned-movie").append("<button onclick = 'addMovieToList()'>Add Movie To List</button>")
            },
        })
    } else {
        $.ajax({
            url: '/movie/list',
            type: 'GET',
            contentType: "application/javascript",
            success: function(result) { 
                $("body").html(result)
            }
        });
    }
}

function addMovieToList() {
//    event.preventDefault();
    var title = $("#getTitle").val();
    console.log("TITLE IS :" + title)
    $.ajax({
        url: '/movie/add/test/'+title,
        type: 'GET',
        contentType: "application/javascript",
        success: function(result) { 
            alert(result)
        }
    });
}

function listMovies(event) {
    event.preventDefault();
    $.ajax({
        url: '/movie/list',
        type: 'GET',
        contentType: "application/javascript",
        success: function(result) { 
            $("body").html(result)
        }
    });
}

function updateMovie(event) {
    event.preventDefault();
    
    var title = $("#updateTitle").val();
    var description = $("#updateDescription").val();
    var director = $("#updateDirector").val();
    var year = $("#updateYear").val();
    var rating = $("#updateRating").val();
    
    $.ajax({
        url: '/movie/update/'+title+'/'+description+'/'+director+'/'+year+'/'+rating,
        type: 'POST',
        success: function(result) {
            document.getElementById("updateMovie").reset()
            alert(result)
        }
    });
}

function deleteMovie(event) {
    event.preventDefault();
    
    var title = $("#deleteTitle").val();
    
    $.ajax({
        url: '/movie/delete/' + title,
        type: 'DELETE',
        success: function(result) {
            alert(result)
        }
    });
}

        
